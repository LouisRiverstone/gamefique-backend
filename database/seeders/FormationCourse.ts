import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FormationCourse from 'App/Models/FormationCourse'
import DataFormationCourse from '../data/FormationCourse'

export default class FormationCourseSeeder extends BaseSeeder {
  public async run() {


    const formatedData = DataFormationCourse.map(row => {
      return {
        id: row[0],
        formation_courses_areas_id: row[2],
        name: row[4],
        formation_courses_levels_id: row[5]
      }
    });

    await FormationCourse.updateOrCreateMany('id', formatedData);
  }
}
