import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator';



export default class AuthController {

  public async login({ request, response, auth }: HttpContextContract) {

    const data = request.only(['email', 'password']);
    const user = await User.findBy('email', data.email);

    if (user && await Hash.verify(user.password, data.password)) {
      return await auth.use('api').generate(user)
    }

    return response.badRequest('Invalid Credentials');
  }

  public async register({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateUserValidator)
      return await User.create(payload)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
}
