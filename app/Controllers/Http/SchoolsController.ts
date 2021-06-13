import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SchoolAPI from "App/Services/SchoolAPI"


export default class SchoolsController {
  public async index({ request }: HttpContextContract) {
    const data = request.only(['name', 'cod'])
    return await SchoolAPI.getSchools(data);
  }

  public async create({ }: HttpContextContract) {
  }

  public async store({ }: HttpContextContract) {
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
