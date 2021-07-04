import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import Application from '@ioc:Adonis/Core/Application'

import CreateUserValidator from 'App/Validators/CreateUserValidator';
import UpdateUserValidator from 'App/Validators/UpdateUserValidator';



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

      return await auth.use('api').generate(user)
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
        loader.load('school', school => {
          school.preload('city', city => {
            city.preload('state')
          })
        })
        loader.load('formation_institute')
      })

      return auth.user

    } catch (error) {
      response.unprocessableEntity(error)
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    try {
      await auth.authenticate();
      const payload = await request.validate(UpdateUserValidator)
      const user = auth.user

      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      if (!user) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      user.firstName = payload.first_name
      user.lastName = payload.last_name
      user.formation_courses_id = payload.formation_courses_id
      user.school_id = payload.school_id
      user.formation_institutes_id = payload.formation_institutes_id

      return await user.save()

    } catch (error) {
      return response.unprocessableEntity(error)
    }
  }

  public async photo({ request, response, auth }: HttpContextContract) {
    try {
      const photo = request.file('photo', {
        size: '2mb',
        extnames: ['jpg', 'png', 'gif'],
      })

      if (!photo) {
        return response.unprocessableEntity('Nenhuma foto anexada');
      }

      await auth.authenticate();
      await photo.validate();
      const user = auth.user

      if (!auth.isAuthenticated) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      if (!user) {
        return response.unauthorized('Sem autorização, logue em sua conta');
      }

      if (!photo.isValid) {
        return response.unprocessableEntity("Envie uma foto em um dos formatos ('jpg', 'png', 'gif') de no maximo 2mb")
      }

      const fileName = `${cuid()}.${photo.extname}`
      await photo.move(Application.tmpPath('uploads'), { name: fileName })

      user.photo = fileName;

      return await user.save()

    } catch (error) {
      return response.unprocessableEntity(error)
    }
  }
}
