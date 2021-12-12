import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Snippets extends BaseSchema {
  protected tableName = 'snippets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('link')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
