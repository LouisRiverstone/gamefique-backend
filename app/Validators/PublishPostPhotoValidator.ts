import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PublishPostPhotoValidator {
	constructor(protected ctx: HttpContextContract) {
	}


	public schema = schema.create({
		post_id: schema.string({}, [rules.required()]),
		photo: schema.file({}, [rules.required()])
	})


	public messages = {
		'post_id.required': "Precisa do id da postagem referente a imagem a ser enviada",
		'photo.required': "Precisa enviar o arquivo da foto",
	}
}
