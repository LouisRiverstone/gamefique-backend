import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePostValidator {
	constructor(protected ctx: HttpContextContract) {
	}


	public schema = schema.create({
		title: schema.string({}, [rules.required(), rules.minLength(5)]),
		description: schema.string({}, [rules.required()]),
		temp_html: schema.string({}, [rules.required()]),
		class_plans_id: schema.number.optional(),
		school_subject_id: schema.number([rules.required()]),
		tags: schema.array().members(schema.number()),
		class_plan: schema.object.optional().members({
			duration: schema.string({}, [rules.required()]),
			objectives: schema.array().members(
				schema.object().members({
					description: schema.string({}, [rules.required()])
				}
				)
			),
			activities: schema.array().members(
				schema.object().members({
					description: schema.string({}, [rules.required()])
				}
				)
			),
			strategies: schema.array().members(
				schema.object().members({
					description: schema.string({}, [rules.required()])
				}
				)
			),
			resources: schema.array().members(
				schema.object().members({
					description: schema.string({}, [rules.required()])
				}
				)
			),
		})
	})


	public messages = {
		'title.required': "A postagem precisa de um título",
		'description.required': "A postagem precisa de uma descrição",
		'temp_html.required': "A postagem precisa ter um corpo",
		'tag_id.required': "A postagem precisa de uma tag",
		'school_subject_id.required': "A postagem precisa de uma Matéria",
	}
}
