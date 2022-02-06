import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PostsStatus extends BaseModel {

  public static PENDING = 1;
  public static PUBLISHED = 2;
  public static BLOCKED = 3;
  public static BANNED = 4;

  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

}
