import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostsTags extends BaseSchema {
  protected tableName = 'posts_tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('post_id')
      table.foreign('post_id').references('id').inTable('posts')
      table.integer('tag_id')
      table.foreign('tag_id').references('id').inTable('tags')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
