import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPostsStatuses extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('post_status_id').unsigned().nullable().after('user_id')
      table.integer('school_subject_id').unsigned().nullable().after('user_id')
      table.dateTime('deleted_at').nullable().after('updated_at')
      table.foreign('post_status_id').references('id').inTable('posts_statuses')
      table.foreign('school_subject_id').references('id').inTable('school_subjects')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('post_status_id')
      table.dropForeign('school_subject_id')
      table.dropColumn('post_status_id')
      table.dropColumn('school_subject_id')
      table.dropColumn('deleted_at')
    })
  }
}
