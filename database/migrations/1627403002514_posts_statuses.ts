import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PostsStatuses extends BaseSchema {
  protected tableName = 'posts_statuses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('description')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
