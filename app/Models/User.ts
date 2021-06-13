import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import FormationInstitute from 'App/Models/FormationInstitute'
import FormationCourse from 'App/Models/FormationCourse'
import Post from './Post'
import Comment from './Comment'


export default class user extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column({ serializeAs: null })
  public password: string

  @hasOne(() => FormationInstitute, {
    foreignKey: 'formation_institutes_id',
  })
  public formation_institute: HasOne<typeof FormationInstitute>

  @hasOne(() => FormationCourse, {
    foreignKey: 'formation_courses_id',
  })
  public formation_courses: HasOne<typeof FormationCourse>

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>


  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(users: users) {
    if (users.$dirty.password) {
      users.password = await Hash.make(users.password)
    }
  }
}
