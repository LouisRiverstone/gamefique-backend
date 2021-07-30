import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ClassPlan from './ClassPlan'

export default class ClassPlanActivity extends BaseModel {
  @column()
  public description: string

  @column()
  public class_plan_id: number

  @belongsTo(() => ClassPlan)
  public class_plan: BelongsTo<typeof ClassPlan>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
