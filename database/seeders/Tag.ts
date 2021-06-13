import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tag from 'App/Models/Tag'

export default class TagSeeder extends BaseSeeder {
  public async run() {
    const tags = [
      { id: 1, name: "Desenvolvimento de Jogos Digitais" },
      { id: 2, name: "Gamificação" }
    ]

    await Tag.updateOrCreateMany('id', tags)
  }
}
