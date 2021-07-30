import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassPlanResources extends BaseSchema {
  protected tableName = 'class_plan_resources'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('description')
      table.integer('class_plan_id').nullable()
      table.foreign('class_plan_id').references('id').inTable('class_plan').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
