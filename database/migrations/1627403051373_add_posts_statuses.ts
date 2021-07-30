import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPostsStatuses extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('post_status_id').nullable().after('id')
      table.foreign('post_status_id').references('id').inTable('post_statuses')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('post_status_id')

      table.dropColumn('post_status_id')
    })
  }
}
