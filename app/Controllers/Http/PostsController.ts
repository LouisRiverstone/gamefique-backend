import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Post from 'App/Models/Post'
import Application from '@ioc:Adonis/Core/Application'
import PostsStatus from 'App/Models/PostsStatus'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import PublishPostValidator from 'App/Validators/PublishPostValidator'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'

import moment from "moment"
import PublishPostPhotoValidator from 'App/Validators/PublishPostPhotoValidator'

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const post = request.only(['page', 'tag', 'search'])
    const page = post?.page || 1
    const max = 20

    const postList = Post.query().where('post_status_id', 2).whereNull('deletedAt').preload('comments')
      .preload('like')
      .preload('tags')
      .preload('school_subject')
      .preload('user', user => {
        user.preload('school').preload('formation_courses').preload('formation_institute');
      })

    if (post.search && post.search.length > 0) {
      postList.where('title', 'LIKE', `%${post.search}%`).orWhere('description', 'LIKE', `%${post.search}%`)
    }

    if (post.tag) {
      postList.whereHas('tags', (query) => {
        query.where('tags.id', post.tag)
      })
    }

    return await postList.paginate(page, max)
  }

  public async topPosts({ }: HttpContextContract) {

    const startDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss');

    const postList = Post.query()
      .where('post_status_id', 2)
      .whereNull('deletedAt')
      .preload('like')
      .withAggregate('like', (query) => {
        query.countDistinct('user_id').as('likes')
      })
      .preload('user')
      .whereRaw(`updated_at BETWEEN '${endDate}' AND '${startDate}'`)
      .orderBy('likes', 'desc').limit(5)

    return await postList
  }

  public async store({ auth, request, response }: HttpContextContract) {
    await auth.authenticate();

    try {
      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      const payload = await request.validate(CreatePostValidator)
      const temporaryPost = {} as Post

      temporaryPost.user_id = auth.user?.id || 0
      temporaryPost.title = payload.title
      temporaryPost.description = payload.description
      temporaryPost.temp_html = payload.temp_html
      temporaryPost.post_status_id = 1

      temporaryPost.school_subject_id = payload.school_subject_id

      let post = await Post.create(temporaryPost);

      if (payload.tags && payload.tags.length > 0) {
        post.related('tags').sync(payload.tags);
      }

      if (payload.class_plan) {
        let classPlans;

        if (payload.class_plan != null) {
          classPlans = await post.related('class_plan').updateOrCreate({ id: payload.class_plan.id }, { duration: payload.class_plan.duration })
        } else {
          classPlans = await post.related('class_plan').create({ duration: payload.class_plan.duration })
        }


        await classPlans.related('activities').query().where('class_plan_id', classPlans.id).delete();
        await classPlans.related('objectives').query().where('class_plan_id', classPlans.id).delete();
        await classPlans.related('resources').query().where('class_plan_id', classPlans.id).delete();
        await classPlans.related('strategies').query().where('class_plan_id', classPlans.id).delete();

        await classPlans.related('activities').createMany(this.mapArraysToCreateModels(payload.class_plan.activities, 'class_plan_id', classPlans.id))
        await classPlans.related('objectives').createMany(this.mapArraysToCreateModels(payload.class_plan.objectives, 'class_plan_id', classPlans.id))
        await classPlans.related('resources').createMany(this.mapArraysToCreateModels(payload.class_plan.resources, 'class_plan_id', classPlans.id))
        await classPlans.related('strategies').createMany(this.mapArraysToCreateModels(payload.class_plan.strategies, 'class_plan_id', classPlans.id))
      }


      await post.save();

      await post.load(loader => {
        loader.load('class_plan', (class_plan) => {
          class_plan.preload('activities')
          class_plan.preload('objectives')
          class_plan.preload('resources')
          class_plan.preload('strategies')
        })
      })

      return post;

    } catch (error) {
      console.error(error)
      return response.badRequest(error)
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const post = await Post.findBy('id', params?.id)

      if (!post) {
        return response.notFound("Não foi encontrado o Post")
      }

      await post.load((loader) => {
        loader.load('comments', comments => {
          comments.preload('user', user => {
            user.preload('school').preload('formation_courses').preload('formation_institute');
          }).orderBy('updated_at', 'desc')
        })

        loader.load('like')
        loader.load('tags')
        loader.load('school_subject')
        loader.load('class_plan', class_plan => {
          class_plan
            .preload('activities')
            .preload('objectives')
            .preload('resources')
            .preload('strategies')
        })

        loader.load('user', user => {
          user.preload('school').preload('formation_courses').preload('formation_institute');
        });

        loader.load('snippets', snippets => {
          snippets.preload('programming_language')
        })
      })

      return post
    } catch (error) {
      console.log(error)
      return response.unprocessableEntity(error.messages);
    }
  }

  public async update({ response, auth, params, request }: HttpContextContract) {
    await auth.authenticate();
    try {
      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      if (!params.id) {
        return response.unauthorized('Id de postagem não indentificado');
      }

      const post = await Post.findByOrFail('id', params.id);

      if (post.user_id != auth.user?.id) {
        return response.unauthorized('Sem autorização, esta postagem não pertence a você');
      }

      const payload = await request.validate(UpdatePostValidator);

      return await this.updatePost(post, payload, PostsStatus.PENDING)

    } catch (error) {
      response.unprocessableEntity(error);
    }
  }

  public async publish({ response, auth, params, request }: HttpContextContract) {
    await auth.authenticate();
    try {
      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      if (!params.id) {
        return response.unauthorized('Id de postagem não indentificado');
      }

      let post = await Post.findByOrFail('id', params.id);

      if (post.user_id != auth.user?.id) {
        return response.unauthorized('Sem autorização, esta postagem não pertence a você');
      }

      const payload = await request.validate(PublishPostValidator);

      return await this.updatePost(post, payload, PostsStatus.PUBLISHED)
    } catch (error) {
      console.error(error)
      response.unprocessableEntity(error);
    }
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    await auth.authenticate();
    try {
      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      const post = await Post.findByOrFail('id', params?.id);

      if (post.user_id != auth.user?.id) {
        return response.unauthorized('Sem autorização, esta postagem não pertence a você');
      }

      return await post.delete();

    } catch (error) {
      response.unprocessableEntity(error);
    }
  }

  public async photo({ request, response, auth }: HttpContextContract) {
    await auth.authenticate();
    try {
      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      const payload = await request.validate(PublishPostPhotoValidator);


      let post = await Post.findByOrFail('id', payload.post_id);

      if (post.user_id != auth.user?.id) {
        return response.unauthorized('Sem autorização, esta postagem não pertence a você');
      }

      const photo = request.file('photo', {
        size: '2mb',
        extnames: ['jpg', 'png', 'gif'],
      })

      if (!photo) {
        return response.unprocessableEntity('Nenhuma foto anexada');
      }

      if (!photo.isValid) {
        return response.unprocessableEntity("Envie uma foto em um dos formatos ('jpg', 'png', 'gif') de no maximo 2mb")
      }

      const fileName = `${cuid()}.${photo.extname}`
      await photo.move(Application.tmpPath('uploads'), { name: fileName })

      post.photo = fileName;

      await post.save()

      return { file: fileName }

    } catch (error) {
      console.error(error)
      return response.unprocessableEntity(error)
    }
  }

  private async updatePost(post: Post, payload: any, postStatus: number) {

    post.title = payload.title
    post.description = payload.description
    post.html = payload.html
    post.post_status_id = postStatus
    post.school_subject_id = payload.school_subject_id

    if (payload.tags && payload.tags.length > 0) {
      post.related('tags').sync(payload.tags);
    }


    if (payload.class_plan) {
      let classPlans;

      if (payload.class_plan != null) {
        classPlans = await post.related('class_plan').updateOrCreate({ id: payload.class_plan.id }, { duration: payload.class_plan.duration })
      } else {
        classPlans = await post.related('class_plan').create({ duration: payload.class_plan.duration })
      }


      await classPlans.related('activities').query().where('class_plan_id', classPlans.id).delete();
      await classPlans.related('objectives').query().where('class_plan_id', classPlans.id).delete();
      await classPlans.related('resources').query().where('class_plan_id', classPlans.id).delete();
      await classPlans.related('strategies').query().where('class_plan_id', classPlans.id).delete();

      await classPlans.related('activities').createMany(this.mapArraysToCreateModels(payload.class_plan.activities, 'class_plan_id', classPlans.id))
      await classPlans.related('objectives').createMany(this.mapArraysToCreateModels(payload.class_plan.objectives, 'class_plan_id', classPlans.id))
      await classPlans.related('resources').createMany(this.mapArraysToCreateModels(payload.class_plan.resources, 'class_plan_id', classPlans.id))
      await classPlans.related('strategies').createMany(this.mapArraysToCreateModels(payload.class_plan.strategies, 'class_plan_id', classPlans.id))
    }

    await post.save()

    await post.load(loader => {
      loader.load('tags')
      loader.load('school_subject')
      loader.load('class_plan', (class_plan) => {
        class_plan.preload('activities')
        class_plan.preload('objectives')
        class_plan.preload('resources')
        class_plan.preload('strategies')
      })
    })

    return post;
  }

  private mapArraysToCreateModels(arrayToMap, property, value) {
    return arrayToMap.map((row: any) => {
      row[property] = value;
      return row
    })
  }
}
