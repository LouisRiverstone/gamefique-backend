import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, hasMany, HasMany, afterCreate, computed, beforeDelete } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Comment from './Comment'
import Snippet from './Snippet'
import Like from './Like'

import { writeFileSync, readFileSync, unlink, mkdirSync, existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public folder_uuid: string

  @column()
  public temp_html: string | null

  @column()
  public photo: string | null


  @computed()
  public get html() {
    if (!this.folder_uuid) {
      return null
    }
    return readFileSync(`tmp/posts/${this.folder_uuid}/post.html`, { encoding: 'utf8' }) || null;
  }
  public set html(html) {
    if (this.folder_uuid) {
      writeFileSync(`tmp/posts/${this.folder_uuid}/post.html`, `${html}`, { encoding: 'utf8', flag: 'w' })
    }
  }

  @column()
  public user_id: number

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment, { foreignKey: 'post_id' })
  public comments: HasMany<typeof Comment>

  @hasMany(() => Snippet, { foreignKey: 'post_id' })
  public snippets: HasMany<typeof Snippet>

  @hasMany(() => Like, { foreignKey: 'post_id' })
  public like: HasMany<typeof Like>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @afterCreate()
  public static async createPostFile(post: Post) {
    const uuid = uuidv4();
    post.folder_uuid = uuid

    if (!existsSync('tmp/posts')) {
      mkdirSync('tmp/posts');
    }

    mkdirSync(`tmp/posts/${post.folder_uuid}`);
    writeFileSync(`tmp/posts/${post.folder_uuid}/post.html`, `${post.temp_html}`, { encoding: 'utf8', flag: 'w' })
    post.temp_html = null

    post.save();
  }

  @beforeDelete()
  public static async deletePostFile(post: Post) {
    unlink(`tmp/posts/${post.folder_uuid}/post.html`, (err) => {
      if (err) throw err;
    });
  }
}
