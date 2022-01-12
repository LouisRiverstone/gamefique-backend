import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ProgrammingLanguage from 'App/Models/ProgrammingLanguage'

export default class ProgrammingLanguageSeeder extends BaseSeeder {
  public async run() {
    const programmingLanguages = [
      { id: 1, name: "C#", file_extension: '.cs' },
      { id: 2, name: "Javascript", file_extension: '.js' },
    ]

    await ProgrammingLanguage.updateOrCreateMany('id', programmingLanguages)
  }
}
