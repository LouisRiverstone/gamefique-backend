import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator';



export default class AuthController {

  public async login({ request, response, auth }: HttpContextContract) {
    const data = request.only(['email', 'password']);
    const user = await User.findBy('email', data.email);

    if (!user) {
      return response.unprocessableEntity('Email não Cadastrado');
    }

    if (user && await Hash.verify(user.password, data.password)) {
      return await auth.use('api').generate(user)
    }

    return response.unauthorized('Email ou Senha Incorretos');
  }

  public async register({ request, auth, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateUserValidator)
      const user = await User.create(payload)

      return {
        user,
        token: await auth.use('api').generate(user)
      }
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  public async user({ response, auth }: HttpContextContract) {
    await auth.authenticate();
    try {
      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      await auth.user?.load(loader => {
        loader.load('formation_courses', formation_courses => {
          formation_courses.preload('formation_course_area')
          formation_courses.preload('formation_courses_levels')
        })
        loader.load('formation_institute')
      })

      return auth.user


    } catch (error) {
      response.unprocessableEntity(error)
    }
  }
}
