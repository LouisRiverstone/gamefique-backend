import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('description')
      table.string('folder_uuid')
      table.text('temp_html', 'longtext')
      table.integer('user_id').unsigned()
      table.timestamps(true, true)
      table.foreign('user_id').references('id').inTable('users')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
