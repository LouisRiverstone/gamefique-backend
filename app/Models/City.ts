import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import State from './State'


export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public state_id: number

  @belongsTo(() => State, {
    foreignKey: 'state_id',
  })
  public state: BelongsTo<typeof State>

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
