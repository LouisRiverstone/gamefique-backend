import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FormationInstitute from 'App/Models/FormationInstitute'

export default class FormationInstitutesController {

  public async index({ request }: HttpContextContract) {
    const data = request.only(['name']);
    const name = data.name?.toUpperCase();
    return FormationInstitute.query().whereRaw(`name LIKE '%${name}%'`).limit(10);
  }
}
