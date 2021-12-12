import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddMoreInfoUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('formation_institutes_id').unsigned()
      table.foreign('formation_institutes_id').references('id').inTable('formation_institutes')
      table.integer('formation_courses_id').unsigned()
      table.foreign('formation_courses_id').references('id').inTable('formation_courses')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign('formation_institutes_id')
      table.dropForeign('formation_courses_id')

      table.dropColumn('formation_institutes_id')
      table.dropColumn('formation_courses_id')
    })
  }
}
