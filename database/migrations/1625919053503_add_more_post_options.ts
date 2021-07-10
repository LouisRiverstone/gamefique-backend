import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddMorePostOptions extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('photo')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('photo')
    })
  }
}
