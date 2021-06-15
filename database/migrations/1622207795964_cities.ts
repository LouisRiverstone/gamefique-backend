import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cities extends BaseSchema {
  protected tableName = 'cities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer("state_id")
      table.foreign('state_id').references('id').inTable('states')
      table.string('name')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('state_id')
    })

    this.schema.dropTable(this.tableName)
  }
}
