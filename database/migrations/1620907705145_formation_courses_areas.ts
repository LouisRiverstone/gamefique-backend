import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormationCoursesAreas extends BaseSchema {
  protected tableName = 'formation_courses_areas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('name')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
