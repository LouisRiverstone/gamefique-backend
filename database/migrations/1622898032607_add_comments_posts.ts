import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {

  public async up() {
    this.schema.alterTable('comments', (table) => {
      table.integer('post_id').unsigned().after('user_id')
      table.foreign('post_id').references('id').inTable('posts')
    })

    this.schema.alterTable('snippets', (table) => {
      table.integer('post_id').unsigned().after('link')
      table.foreign('post_id').references('id').inTable('posts')
    })
  }

  public async down() {
    this.schema.alterTable('comments', (table) => {
      table.dropForeign('post_id')
      table.dropColumn('post_id')
    })

    this.schema.alterTable('snippets', (table) => {
      table.dropForeign('post_id')
      table.dropColumn('post_id')
    })
  }
}
