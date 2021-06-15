import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCommentValidator {
	constructor(protected ctx: HttpContextContract) {
	}


	public schema = schema.create({
		comment: schema.string({}, [rules.required(), rules.minLength(5)]),
		post_id: schema.number([rules.required()])
	})


	public messages = {
		'comment.required': "O comentário precisa de um texto",
		'comment.min': "O comentário precisa ter mais que 5 caractéres",
		'post_id.required': 'Precisa ter o Id da Postagem'
	}
}
