import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PublishPostValidator {
	constructor(protected ctx: HttpContextContract) {
	}


	public schema = schema.create({
		title: schema.string({}, [rules.required(), rules.minLength(5)]),
		description: schema.string({}, [rules.required()]),
		html: schema.string({}, [rules.required()]),
		school_subject_id: schema.number([rules.required()]),
		tags: schema.array().members(schema.number([rules.required()])),
		snippets: schema.array.optional().members(
			schema.object().members({
				name: schema.string({}, [rules.required()]),
				content: schema.string({}, [rules.required()]),
				programming_language_id: schema.number([rules.required(), rules.exists({ table: 'programming_languages', column: 'id' })])
			})
		),
		class_plan: schema.object().members({
			id: schema.number([rules.required(), rules.exists({ table: 'class_plans', column: 'id' })]),
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
		'class_plan.duration.string': "A postagem precisa de uma Duração",
	}
}
