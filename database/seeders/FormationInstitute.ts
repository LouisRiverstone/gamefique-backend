import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FormationInstitute from 'App/Models/FormationInstitute'
import DataFormationIntitute from "../data/FormationInstitute"
import NameFormatter from 'App/Utils/NameFormatter'

export default class FormationInstituteSeeder extends BaseSeeder {
  public async run() {


    const formatedData = DataFormationIntitute.map(row => {
      return {
        id: row[0],
        ies_code: row[1],
        name: NameFormatter(row[2]),
        type: row[7],
      }
    })

    await FormationInstitute.updateOrCreateMany('id', formatedData)
  }
}
