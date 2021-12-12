import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostsTags extends BaseSchema {
  protected tableName = 'posts_tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('post_id').unsigned()
      table.integer('tag_id').unsigned()
      table.foreign('post_id').references('id').inTable('posts')
      table.foreign('tag_id').references('id').inTable('tags')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
