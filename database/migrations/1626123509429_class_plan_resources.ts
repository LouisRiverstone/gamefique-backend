import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassPlanResources extends BaseSchema {
  protected tableName = 'class_plan_resources'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('description')
      table.integer('class_plan_id').unsigned().nullable()
      table.timestamps(true, true)
      table.foreign('class_plan_id').references('id').inTable('class_plans').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
