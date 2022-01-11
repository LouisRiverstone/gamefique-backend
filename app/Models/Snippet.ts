import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, beforeDelete, beforeSave, afterDelete, hasOne, HasOne, computed, } from '@ioc:Adonis/Lucid/Orm'
import ProgrammingLanguage from './ProgrammingLanguage'
import Drive from '@ioc:Adonis/Core/Drive'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import { v4 as uuidv4 } from 'uuid';


export default class Snippet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public link: string

  @column()
  public post_id: number

  @column()
  public programming_language_id: number

  @column({ serializeAs: null })
  public content: string | null

  @belongsTo(() => ProgrammingLanguage, { foreignKey: 'programming_language_id', })
  public programming_language: BelongsTo<typeof ProgrammingLanguage>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeSave()
  public static async createOrUpdateFile(snippet: Snippet) {
    if (!snippet.link) {
      snippet.link = cuid();
    }

    const {
      file_extension
    } = await ProgrammingLanguage.find(snippet.programming_language_id);

    const drive = await Drive.put(`${snippet.link}${file_extension}`, `${snippet.content}`, {
      visibility: 'public',
    })

    snippet.content = null;
  }

  @afterDelete()
  public static async deleteFile(snippet: Snippet) {
    const {
      file_extension
    } = await ProgrammingLanguage.find(snippet.programming_language_id);

    const drive = await Drive.delete(`${snippet.link}${file_extension}`)
  }
}
