import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

import City from './City'
import SchoolType from './SchoolType'

export default class School extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public city_id: number

  @column()
  public school_type_id: number

  @belongsTo(() => SchoolType, {
    foreignKey: 'school_type_id',
  })
  public school_type: BelongsTo<typeof SchoolType>

  @belongsTo(() => City, {
    foreignKey: 'city_id',
  })
  public city: BelongsTo<typeof City>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
