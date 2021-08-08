import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import FormationInstitute from 'App/Models/FormationInstitute'
import FormationCourse from 'App/Models/FormationCourse'
import Post from './Post'
import Comment from './Comment'
import School from './School'


export default class user extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public formation_institutes_id: number

  @column()
  public photo: string

  @column()
  public photo_cover: string

  @belongsTo(() => FormationInstitute, {
    foreignKey: 'formation_institutes_id',
  })
  public formation_institute: BelongsTo<typeof FormationInstitute>

  @column()
  public formation_courses_id: number

  @belongsTo(() => FormationCourse, {
    foreignKey: 'formation_courses_id',
  })
  public formation_courses: BelongsTo<typeof FormationCourse>

  @column()
  public school_id: number

  @belongsTo(() => School, { foreignKey: 'school_id' })
  public school: BelongsTo<typeof School>

  @hasMany(() => Post, { foreignKey: 'user_id' })
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
