import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPostsStatuses extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('post_status_id').nullable().after('user_id')
      table.foreign('post_status_id').references('id').inTable('post_statuses')
      table.integer('school_subject_id').nullable().after('user_id')
      table.foreign('school_subject_id').references('id').inTable('school_subjects')
      table.dateTime('deleted_at').nullable().after('updated_at')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('post_status_id')
      table.dropColumn('post_status_id')
      table.dropForeign('school_subject_id')
      table.dropColumn('school_subject_id')
      table.dropColumn('deleted_at')
    })
  }
}
