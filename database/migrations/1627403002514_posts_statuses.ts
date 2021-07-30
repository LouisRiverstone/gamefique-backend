import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostsStatuses extends BaseSchema {
  protected tableName = 'posts_statuses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
