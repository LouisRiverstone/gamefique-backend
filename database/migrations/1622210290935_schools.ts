import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Schools extends BaseSchema {
  protected tableName = 'schools'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("city_id")
      table.foreign('city_id').references('id').inTable('cities')
      table.string('name')
      table.integer('school_type_id')
      table.foreign('school_type_id').references('id').inTable('school_type')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
