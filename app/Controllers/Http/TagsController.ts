import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'


export default class TagsController {
  public async index({ }: HttpContextContract) {
    return Tag.query().orderBy('id', 'asc');
  }
}
