import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SchoolTypes extends BaseSchema {
  protected tableName = 'schools'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('school_type_id').unsigned().after('city_id')
      table.foreign('school_type_id').references('id').inTable('school_types')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('school_type_id')
      table.dropColumn('school_type_id')
    })
  }
}
