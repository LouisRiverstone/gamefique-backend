import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, afterCreate, beforeDelete } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'

export default class Snippet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public link: string

  @column()
  public post_id: number

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @afterCreate()
  // public static async createPostFile(post: Post) {
  //   const post_uuid = uuidv4();
  //   writeFileSync(`app/Posts/${post_uuid}.html`, `${post.html}`, { encoding: 'utf8', flag: 'w' })
  //   post.html = `${post_uuid}.html`
  //   post.save();
  // }

  // @beforeDelete()
  // public static async deletePostFile(post: Post) {
  //   unlink(`app/Posts/${post.html}`, (err) => {
  //     if (err) throw err;
  //     console.error(`app/Posts/${post.html} was deleted`);
  //   });
  // }
}
