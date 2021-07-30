import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PublishPostValidator {
	constructor(protected ctx: HttpContextContract) {
	}


	public schema = schema.create({
		title: schema.string({}, [rules.required(), rules.minLength(5)]),
		description: schema.string({}, [rules.required()]),
		html: schema.string({}, [rules.required()]),
		class_plans: schema.object().members({
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


	public messages = {}
}
