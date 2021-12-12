import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Schools extends BaseSchema {
  protected tableName = 'schools'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer("city_id").unsigned()
      table.string('name')
      table.timestamps(true, true)
      table.foreign('city_id').references('id').inTable('cities')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
