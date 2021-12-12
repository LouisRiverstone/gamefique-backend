import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormationCourses extends BaseSchema {
  protected tableName = 'formation_courses_levels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('name')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
