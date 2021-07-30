import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PostsStatus extends BaseModel {

  public static PENDING = 1;
  public static PUBLISHED = 2;
  public static BLOCKED = 3;

  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
