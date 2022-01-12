import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Snippet from 'App/Models/Snippet'

export default class SnippetsController {

    public async store({ auth, request, response }: HttpContextContract) {

        const data = request.only(['post_id', 'programming_language_id', 'content', 'name']);

        const d = await Snippet.create(data)

        return d
    }
}
