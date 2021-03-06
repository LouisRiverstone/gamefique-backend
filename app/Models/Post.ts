import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, hasMany, HasMany, afterCreate, computed, beforeDelete, HasOne, hasOne, beforeFetch, beforeFind, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Comment from './Comment'
import Snippet from './Snippet'
import Like from './Like'
import ClassPlan from './ClassPlan'
import PostsStatus from './PostsStatus'
import SchoolSubject from './SchoolSubject'
import Tag from './Tag'

import { softDelete, softDeleteQuery } from '../Services/SoftDelete'
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

  @column()
  public class_plans_id: number

  @hasOne(() => ClassPlan, { foreignKey: 'id' })
  public class_plan: HasOne<typeof ClassPlan>

  @column()
  public post_status_id: number

  @belongsTo(() => PostsStatus, { foreignKey: 'post_status_id' })
  public post_status: BelongsTo<typeof PostsStatus>

  @column()
  public school_subject_id: number

  @hasOne(() => SchoolSubject, { foreignKey: 'id' })
  public school_subject: HasOne<typeof SchoolSubject>

  @manyToMany(() => Tag, {
    pivotTable: 'posts_tags',
  })
  public tags: ManyToMany<typeof Tag>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime

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

  @beforeFind()
  public static softDeletesFind = softDeleteQuery;

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery;

  public async softDelete(column?: string) {
    await softDelete(this, column);
  }
}
