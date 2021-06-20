import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
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

  @belongsTo(() => FormationCoursesArea, { foreignKey: 'formation_courses_areas_id' })
  public formation_course_area: BelongsTo<typeof FormationCoursesArea>

  @belongsTo(() => FormationCoursesLevel, { foreignKey: 'formation_courses_levels_id' })
  public formation_courses_levels: BelongsTo<typeof FormationCoursesLevel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
