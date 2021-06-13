import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FormationCourse from 'App/Models/FormationCourse';

export default class FormationCoursesController {
  public async index({ request }: HttpContextContract) {
    const data = request.only(['name']);
    const name = data.name?.toUpperCase();
    return FormationCourse.query().whereRaw(`name LIKE '%${name}%'`).limit(10);
  }
}
