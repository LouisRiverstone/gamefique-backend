import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SchoolTypes extends BaseSchema {
  protected tableName = 'school_types'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.boolean('is_public')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
