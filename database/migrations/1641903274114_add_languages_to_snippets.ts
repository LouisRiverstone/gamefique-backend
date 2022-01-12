import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddLanguagesToSnippets extends BaseSchema {
  protected tableName = 'snippets'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('programming_language_id').unsigned().after('link')
      table.foreign('programming_language_id').references('id').inTable('programming_languages')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign('programming_language_id');
      table.dropColumn('programming_language_id');
    })
  }
}
