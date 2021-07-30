import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MoreUserInfoProfiles extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('school_id').nullable().after('remember_me_token')
      table.foreign('school_id').references('id').inTable('schools')
      table.string('photo').nullable().after('remember_me_token')
      table.string('photo_cover').nullable().after('remember_me_token')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('school_id')
      table.dropColumn('school_id')
      table.dropColumn('photo')
      table.dropColumn('photo_cover')
    })
  }
}
