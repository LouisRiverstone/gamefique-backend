import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FormationCoursesLevel from 'App/Models/FormationCoursesLevel'

export default class FormationCoursesLevelSeeder extends BaseSeeder {

  
  public async run () {
    const levels = [
      {id: 1, name: "Licenciatura"},
      {id: 2, name: "Bacharelado"},
      {id: 3, name: "Tecnológico"}
    ]

    await FormationCoursesLevel.updateOrCreateMany('id',levels)
  }
}
