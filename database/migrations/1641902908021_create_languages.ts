import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProgrammingLanguages extends BaseSchema {
  protected tableName = 'programming_languages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('file_extension')
      table.string('content')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
