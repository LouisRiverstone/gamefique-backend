import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateLikeValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		post_id: schema.number([rules.required()])
	})


	public messages = {
		'post_id.required': "A postagem precisa de um post",
	}
}
