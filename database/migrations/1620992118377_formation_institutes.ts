import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormationInstitutes extends BaseSchema {
  protected tableName = 'formation_institutes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('ies_code')
      table.text('name')
      table.text('type')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
