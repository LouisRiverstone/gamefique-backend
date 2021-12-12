import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import ClassPlanObjective from './ClassPlanObjective'
import ClassPlanActivity from './ClassPlanActivity'
import ClassPlanStrategy from './ClassPlanStrategy'
import ClassPlanResource from './ClassPlanResource'
import Post from './Post'

export default class ClassPlan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public duration: string

  @hasMany(() => ClassPlanObjective, { foreignKey: 'class_plan_id' })
  public objectives: HasMany<typeof ClassPlanObjective>

  @hasMany(() => ClassPlanActivity, { foreignKey: 'class_plan_id' })
  public activities: HasMany<typeof ClassPlanActivity>

  @hasMany(() => ClassPlanStrategy, { foreignKey: 'class_plan_id' })
  public strategies: HasMany<typeof ClassPlanStrategy>

  @hasMany(() => ClassPlanResource, { foreignKey: 'class_plan_id' })
  public resources: HasMany<typeof ClassPlanResource>

  @belongsTo(() => Post, { foreignKey: 'class_plan_resources_id' })
  public post: BelongsTo<typeof Post>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
