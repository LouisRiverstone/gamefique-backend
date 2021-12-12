import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateLikes extends BaseSchema {
  protected tableName = 'likes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.foreign('post_id').references('id').inTable('posts')
      table.integer('user_id').unsigned()
      table.timestamps(true, true)
      table.integer('post_id').unsigned()
      table.foreign('user_id').references('id').inTable('users')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
