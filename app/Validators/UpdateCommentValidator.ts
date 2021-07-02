import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCommentValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		comment: schema.string({}, [rules.required(), rules.minLength(5)]),
	})


	public messages = {
		'comment.required': "O comentário precisa de um texto",
		'comment.min': "O comentário precisa ter mais que 5 caractéres",
	}
}
