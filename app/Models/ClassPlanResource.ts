import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ClassPlan from './ClassPlan'

export default class ClassPlanResource extends BaseModel {
  @column()
  public description: string

  @column()
  public class_plan_id: number

  @belongsTo(() => ClassPlan, { foreignKey: 'class_plan_id' })
  public class_plan: BelongsTo<typeof ClassPlan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
