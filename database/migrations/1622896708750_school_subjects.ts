import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SchoolSubjects extends BaseSchema {
  protected tableName = 'school_subjects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
