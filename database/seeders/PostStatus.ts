import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PostsStatus from 'App/Models/PostsStatus'

export default class PostStatusSeeder extends BaseSeeder {
  public async run() {
    const status = [
      { id: 1, description: "PENDING" },
      { id: 2, description: "PUBLISHED" },
      { id: 3, description: "BLOCKED" },
    ]

    await PostsStatus.updateOrCreateMany('id', status)

  }
}
