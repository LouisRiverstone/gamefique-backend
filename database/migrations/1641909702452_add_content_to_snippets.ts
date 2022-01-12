import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddContentToSnippets extends BaseSchema {
  protected tableName = 'snippets'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('content').nullable().after('link')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('content');
    })
  }
}
