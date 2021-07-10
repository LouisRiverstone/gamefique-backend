import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Like from 'App/Models/Like';
import Post from 'App/Models/Post';
import CreateLikeValidator from 'App/Validators/CreateLikeValidator'

export default class LikesController {
  public async index({ }: HttpContextContract) {
  }

  public async create({ }: HttpContextContract) {
  }

  public async store({ auth, request, response }: HttpContextContract) {
    try {
      await auth.authenticate()

      if (!auth.isAuthenticated) {
        return response.unauthorized("Use o token do seu usuário para executar essa ação")
      }

      const payload = await request.validate(CreateLikeValidator);
      const post = await Post.findOrFail(payload.post_id)

      await post.load('like')

      const iLiked = post.like.find((like) => like.user_id == auth.user?.id)

      if (iLiked) {
        await Like.query().where("post_id", post.id).where('user_id', auth.user?.id as number).delete();

        return response.send({ response: "Like deletado com sucesso" })
      } else {
        const like = await Like.create({ user_id: auth.user?.id, post_id: post.id })

        return response.send({ response: "Like criado com sucesso", like })
      }

    } catch (error) {
      response.unprocessableEntity(error)
    }
  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
