import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Post_Comment from 'App/Models/Post_Comment'
import CreateCommentValidator from 'App/Validators/CreateCommentValidator'
import UpdateCommentValidator from 'App/Validators/UpdateCommentValidator'

import _ from "lodash"

export default class CommentsController {
  public async index({ request }: HttpContextContract) {
    const post = request.only['page']
    const page = post?.page || 1
    const max = 20

    return await Comment.query().paginate(page, max)
  }

  public async store({ auth, request, response }: HttpContextContract) {
    await auth.authenticate();

    try {
      if (auth.isAuthenticated) {
        const payload = await request.validate(CreateCommentValidator);
        const comment = await Comment.create({ user_id: auth.user?.id, comment: payload.comment, post_id: payload.post_id, });

        return comment
      } else {
        return response.unauthorized('Você precisa estar logado para comentar!')
      }
    } catch (error) {
      return response.unprocessableEntity(error)
    }
  }

  public async show({ request, response, params }: HttpContextContract) {
    try {
      const comment = await Comment.findBy('id', params?.id);

      if (!comment) {
        return response.notFound('Comentário Não Encontrado')
      }

      await comment.load(loader => {
        loader.load('user', user => {
          user.preload('school').preload('formation_courses').preload('formation_institute');
        })
      })

      return comment
    } catch (error) {
      console.error(error)
      return response.unprocessableEntity(error)
    }

  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ response, auth, params, request }: HttpContextContract) {
    try {
      await auth.authenticate();

      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      const payload = await request.validate(UpdateCommentValidator);
      const comment = await Comment.findByOrFail('id', params?.id)

      if (!(comment.user_id === auth.user?.id)) {
        return response.unauthorized("Este comentário não pertence ao usuário deste token")
      }

      comment.comment = payload.comment

      return comment.save();

    } catch (error) {
      return response.unprocessableEntity(error)
    }
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    try {
      await auth.authenticate();

      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      const comment = await Comment.findByOrFail('id', params?.id)

      if (!(comment.user_id === auth.user?.id)) {
        return response.unauthorized("Este comentário não pertence ao usuário deste token")
      }

      await comment.delete();

      return response.send('Apagado com Sucesso');
    } catch (error) {
      return response.unprocessableEntity(error)
    }
  }
}
