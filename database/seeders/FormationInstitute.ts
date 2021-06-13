import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FormationInstitute from 'App/Models/FormationInstitute'
import DataFormationIntitute from "../data/FormationInstitute"

export default class FormationInstituteSeeder extends BaseSeeder {
  public async run() {


    const formatedData = DataFormationIntitute.map(row => {
      return {
        id: row[0],
        ies_code: row[1],
        name: row[2],
        type: row[7],
      }
    })

    await FormationInstitute.updateOrCreateMany('id', formatedData)
  }
}
