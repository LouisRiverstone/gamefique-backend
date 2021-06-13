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

    return await Post.query().paginate(page, max)
  }

  public async create({ }: HttpContextContract) {
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
      return response.badRequest(error)
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      return await Post.findByOrFail('id', params?.id);
    } catch (error) {
      return response.unprocessableEntity(error.messages);
    }
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ response, auth, params, request }: HttpContextContract) {
    await auth.authenticate();
    try {

      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      const post = await Post.findByOrFail('id', params?.id);
      const payload = await request.validate(UpdatePostValidator);
      console.log(payload);
      // post.merge(payload);
      // return await post.save();
    } catch (error) {
      response.unprocessableEntity(error);
    }
  }

  public async destroy({ }: HttpContextContract) {

  }
}