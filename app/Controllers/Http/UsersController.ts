import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

  public async index({ }: HttpContextContract) {

  }

  public async create({ }: HttpContextContract) {
  }

  public async store({ }: HttpContextContract) {
  }

  public async show({ request, params, response }: HttpContextContract) {
    try {
      const user = await User.findBy('id', params?.id)

      if (!user) {
        return response.notFound("Não foi encontrado o Usuário")
      }

      await user.load(loader => {
        loader.load('formation_courses', formation_courses => {
          formation_courses.preload('formation_course_area')
          formation_courses.preload('formation_courses_levels')
        })
        loader.load('school', school => {
          school.preload('city', city => {
            city.preload('state')
          })
        })
        loader.load('formation_institute')

        loader.load('posts', post => {
          post.where('post_status_id', 2)
          post.preload('comments')
          post.preload('like')
          post.preload('user', user => {
            user.preload('school').preload('formation_courses').preload('formation_institute');
          })
        })
      })

      return user
    } catch (error) {
      console.log(error)
      return response.unprocessableEntity(error)
    }
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
