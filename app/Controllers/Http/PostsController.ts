import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator } from '@ioc:Adonis/Core/Validator'
import Post from 'App/Models/Post'
import PostsStatus from 'App/Models/PostsStatus'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import PublishPostValidator from 'App/Validators/PublishPostValidator'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const post = request.only['page']
    const page = post?.page || 1
    const max = 20

    return await Post.query().where('post_status_id', 2)
      .preload('comments')
      .preload('like')
      .preload('user', user => {
        user.preload('school').preload('formation_courses').preload('formation_institute');
      })
      .paginate(page, max)
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

      let post = await Post.create(temporaryPost);

      if (payload.class_plans) {
        const classPlans = await post.related('class_plan').create({ duration: payload.class_plans.duration });

        await classPlans.related('class_plan_activities').createMany(this.mapArraysToCreateModels(payload.class_plans.activities, 'class_plan_id', classPlans.id))
        await classPlans.related('class_plan_objectives').createMany(this.mapArraysToCreateModels(payload.class_plans.objectives, 'class_plan_id', classPlans.id))
        await classPlans.related('class_plan_resources').createMany(this.mapArraysToCreateModels(payload.class_plans.resources, 'class_plan_id', classPlans.id))
        await classPlans.related('class_plan_strategies').createMany(this.mapArraysToCreateModels(payload.class_plans.strategies, 'class_plan_id', classPlans.id))

        await post.save();
      }

      await post.load(loader => {
        loader.load('class_plan', (class_plan) => {
          class_plan.preload('class_plan_activities')
          class_plan.preload('class_plan_objectives')
          class_plan.preload('class_plan_resources')
          class_plan.preload('class_plan_strategies')
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

        loader.load('class_plan', class_plan => {
          class_plan
            .preload('class_plan_activities')
            .preload('class_plan_objectives')
            .preload('class_plan_resources')
            .preload('class_plan_strategies')
        })

        loader.load('user', user => {
          user.preload('school').preload('formation_courses').preload('formation_institute');
        });

        loader.load('snippets')
      })

      return post
    } catch (error) {
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

      post.title = payload.title
      post.description = payload.description
      post.html = payload.html
      post.post_status_id = PostsStatus.PENDING


      if (payload.class_plans) {
        const classPlans = await post.related('class_plan').updateOrCreate({ id: payload.class_plans_id }, { duration: payload.class_plans.duration })

        await classPlans.related('class_plan_activities').query().where('class_plan_id', classPlans.id).delete();
        await classPlans.related('class_plan_objectives').query().where('class_plan_id', classPlans.id).delete();
        await classPlans.related('class_plan_resources').query().where('class_plan_id', classPlans.id).delete();
        await classPlans.related('class_plan_strategies').query().where('class_plan_id', classPlans.id).delete();

        await classPlans.related('class_plan_activities').createMany(this.mapArraysToCreateModels(payload.class_plans.activities, 'class_plan_id', classPlans.id))
        await classPlans.related('class_plan_objectives').createMany(this.mapArraysToCreateModels(payload.class_plans.objectives, 'class_plan_id', classPlans.id))
        await classPlans.related('class_plan_resources').createMany(this.mapArraysToCreateModels(payload.class_plans.resources, 'class_plan_id', classPlans.id))
        await classPlans.related('class_plan_strategies').createMany(this.mapArraysToCreateModels(payload.class_plans.strategies, 'class_plan_id', classPlans.id))
      }

      await post.save()

      await post.load(loader => {
        loader.load('class_plan', (class_plan) => {
          class_plan.preload('class_plan_activities')
          class_plan.preload('class_plan_objectives')
          class_plan.preload('class_plan_resources')
          class_plan.preload('class_plan_strategies')
        })
      })

      return post;
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

      const { schema, messages } = new PublishPostValidator()

      await validator.validate({
        schema,
        messages,
        data: post
      });

      return post
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



  private mapArraysToCreateModels(arrayToMap, property, value) {
    return arrayToMap.map((row: any) => {
      row[property] = value;
      return row
    })
  }
}
