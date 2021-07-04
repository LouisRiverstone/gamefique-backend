import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
	constructor(protected ctx: HttpContextContract) {

	}

	public schema = schema.create({
		first_name: schema.string({}, [rules.required()]),
		last_name: schema.string({}, [rules.required()]),
		// email: schema.string({}, [
		// 	rules.required(),
		// 	rules.email(),
		// 	rules.unique({ table: 'users', column: 'email' }),
		// ]),
		formation_institutes_id: schema.number([rules.required()]),
		formation_courses_id: schema.number([rules.required()]),
		school_id: schema.number([rules.required()]),
	})

	public messages = {
		'email.unique': "Email Já Cadastrado",
		'first_name.required': "Precisa de Um Nome Para Cadastrar",
		'last_name.required': "Precisa de Um Sobrenome Para Cadastrar",
		'email.required': "Precisa de um Email para Cadastrar",
		'email.email': "Precisa de um Email Válido para Cadastrar",
		'formation_institutes_id.required': "Precisa de Uma Instituição De Formação",
		'formation_courses_id.required': "Precisa de Um Curso de Formação",
		'school_id.required': "Precisa de uma escola de Atuação",
	}
}
