import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MoreUserInfoProfiles extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('school_id').nullable()
      table.foreign('school_id').references('id').inTable('schools')
      table.string('photo').nullable()
      table.string('photo_cover').nullable()
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
