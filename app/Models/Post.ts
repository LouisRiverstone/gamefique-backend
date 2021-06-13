import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, hasMany, HasMany, afterCreate, computed } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Comment from './Comment'
import Snippet from './Snippet'

import { writeFileSync, readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public html: string

  @computed()
  public get html_raw() {
    return readFileSync(`app/Posts/${this.html}`, { encoding: 'utf8' }) || null;
  }

  @column()
  public user_id: number

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @hasMany(() => Snippet)
  public snippets: HasMany<typeof Snippet>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterCreate()
  public static async savePostFile(post: Post) {
    const post_uuid = uuidv4();
    writeFileSync(`app/Posts/${post_uuid}.html`, `${post.html}`, { encoding: 'utf8', flag: 'w' })
    post.html = `${post_uuid}.html`
    post.save();
  }

}
