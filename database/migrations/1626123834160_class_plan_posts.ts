import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassPlanPosts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('class_plans_id').nullable().after('user_id')
      table.foreign('class_plans_id').references('id').inTable('class_plans').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('class_plans_id')

      table.dropColumn('class_plans_id')
    })
  }
}
