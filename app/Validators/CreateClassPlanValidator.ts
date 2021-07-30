import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClassPlanValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
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

	public messages = {}
}
