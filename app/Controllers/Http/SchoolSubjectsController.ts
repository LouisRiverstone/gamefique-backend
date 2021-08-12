import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SchoolSubject from 'App/Models/SchoolSubject'

export default class SchoolSubjectsController {
  public async index({ }: HttpContextContract) {
    return SchoolSubject.query().orderBy('id', 'asc')
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
