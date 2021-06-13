import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SchoolType from 'App/Models/SchoolType'

export default class SchoolTypeSeeder extends BaseSeeder {
  public async run() {

    const types = [
      { id: 1, name: "Federal", is_public: true },
      { id: 2, name: "Estadual", is_public: true },
      { id: 3, name: "Municipal", is_public: true },
      { id: 4, name: "Privada", is_public: false },
    ]

    await SchoolType.updateOrCreateMany('id', types)
  }
}
