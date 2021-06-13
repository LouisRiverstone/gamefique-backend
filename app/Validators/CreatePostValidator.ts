import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePostValidator {
	constructor(protected ctx: HttpContextContract) {
	}


	public schema = schema.create({
		title: schema.string({}, [rules.required(), rules.minLength(5)]),
		description: schema.string({}, [rules.required()]),
		html: schema.string({}, [rules.required()]),
	})


	public messages = {
		'title.required': "A postagem precisa de um título",
		'description.required': "A postagem precisa de uma descrição",
		'html.required': "A postagem precisa ter um corpo",
	}
}
