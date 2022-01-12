import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProgrammingLanguage from 'App/Models/ProgrammingLanguage'

export default class ProgrammingLanguagesController {

    public async index({ }: HttpContextContract) {
        return await ProgrammingLanguage.query().orderBy('id', 'asc');
    }

}
