import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormationCourses extends BaseSchema {
  protected tableName = 'formation_courses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer("formation_courses_areas_id").unsigned()
      table.integer('formation_courses_levels_id').unsigned()
      table.text('name')
      table.timestamps(true, true)
      table.foreign('formation_courses_areas_id').references('id').inTable('formation_courses_areas')
      table.foreign('formation_courses_levels_id').references('id').inTable('formation_courses_levels')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('formation_courses_areas_id')
      table.dropForeign('formation_courses_levels_id')
    })

    this.schema.dropTable(this.tableName)
  }
}
