import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClassPlan from 'App/Models/ClassPlan';
import CreateClassPlanValidator from 'App/Validators/CreateClassPlanValidator';

export default class ClassPlansController {
  public async index({ }: HttpContextContract) {
  }

  public async create({ }: HttpContextContract) {
  }

  public async store({ request, auth, response }: HttpContextContract) {
    try {
      await auth.authenticate();

      if (!auth.isAuthenticated) {
        return response.unauthorized("Logue em sua conta para salvar um plano de aula")
      }

      const payload = await request.validate(CreateClassPlanValidator)


      const classPlans = await ClassPlan.create({ duration: payload.duration });

      await classPlans.related('class_plan_activities').createMany(this.mapArraysToCreateModels(payload.activities, 'class_plan_id', classPlans.id))
      await classPlans.related('class_plan_objectives').createMany(this.mapArraysToCreateModels(payload.objectives, 'class_plan_id', classPlans.id))
      await classPlans.related('class_plan_resources').createMany(this.mapArraysToCreateModels(payload.resources, 'class_plan_id', classPlans.id))
      await classPlans.related('class_plan_strategies').createMany(this.mapArraysToCreateModels(payload.strategies, 'class_plan_id', classPlans.id))

      return classPlans

    } catch (error) {
      console.error(error)
      return response.unprocessableEntity(error);
    }
  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ request, response }: HttpContextContract) {
  }

  private mapArraysToCreateModels(arrayToMap, property, value) {
    return arrayToMap.map((row: any) => {
      row[property] = value;
      return row
    })
  }
}
