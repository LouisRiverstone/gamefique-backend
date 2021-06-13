import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostsSnippets extends BaseSchema {
  protected tableName = 'posts_snippets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('post_id')
      table.foreign('post_id').references('id').inTable('posts')
      table.integer('snippet_id')
      table.foreign('snippet_id').references('id').inTable('snippets').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
