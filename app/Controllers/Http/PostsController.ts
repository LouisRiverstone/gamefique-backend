import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'

import _ from "lodash"


export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const post = request.only['page']
    const page = post?.page || 1
    const max = 20

    return await Post.query()
      .preload('comments')
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
      return await Post.create(_.merge(payload, { user_id: auth.user?.id }))

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

      const post = await Post.findByOrFail('id', params?.id);

      if (post.user_id != auth.user?.id) {
        return response.unauthorized('Sem autorização, esta postagem não pertence a você');
      }

      const payload = await request.validate(UpdatePostValidator);

      post.title = payload.title
      post.description = payload.description
      post.html = payload.html
      post.html_raw = payload.html_raw

      await post.save()

      return post;
    } catch (error) {
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
}
