import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PostsStatus from 'App/Models/PostsStatus'

export default class PostStatusSeeder extends BaseSeeder {
  public async run() {
    const status = [
      { id: 1, description: "Pendente" },
      { id: 2, description: "Publicado" },
      { id: 3, description: "Excluido" },
      { id: 4, description: "Banido" },
    ]

    await PostsStatus.updateOrCreateMany('id', status)

  }
}
