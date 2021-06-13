import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostsComments extends BaseSchema {
  protected tableName = 'posts_comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('post_id')
      table.foreign('post_id').references('id').inTable('posts')
      table.integer('comment_id')
      table.foreign('comment_id').references('id').inTable('comments')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
