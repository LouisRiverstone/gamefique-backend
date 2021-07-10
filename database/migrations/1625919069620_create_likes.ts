import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateLikes extends BaseSchema {
  protected tableName = 'likes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('post_id')
      table.foreign('post_id').references('id').inTable('posts')
      table.integer('user_id')
      table.foreign('user_id').references('id').inTable('users')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
