import { DateTime } from 'luxon'
import { BaseModel, hasOne, HasOne, column } from '@ioc:Adonis/Lucid/Orm'
import FormationCoursesArea from './FormationCoursesArea'
import FormationCoursesLevel from './FormationCoursesLevel'

export default class FormationCourse extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public formation_courses_areas_id: number

  @column()
  public name: string

  @column()
  public formation_courses_levels_id: number

  @hasOne(() => FormationCoursesArea)
  public formation_course_area: HasOne<typeof FormationCoursesArea>

  @hasOne(() => FormationCoursesArea)
  public formation_courses_levels: HasOne<typeof FormationCoursesLevel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
