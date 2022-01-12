import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RemoveIdSnippets extends BaseSchema {
  protected tableName = 'snippets'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('id')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.increments('id').primary()
    })
  }
}
