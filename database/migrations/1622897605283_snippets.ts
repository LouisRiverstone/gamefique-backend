import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Snippets extends BaseSchema {
  protected tableName = 'snippets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('link')
      table.integer('post_id')
      table.foreign('post_id').references('id').inTable('posts')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
