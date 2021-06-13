import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SchoolSubject from 'App/Models/SchoolSubject'

export default class SchoolSubjectSeeder extends BaseSeeder {
  public async run() {

    const subjects = [
      {
        id: 1,
        name: "MATEMÁTICA"
      },
      {
        id: 2,
        name: "LÍNGUA PORTUGUESA"
      },
      {
        id: 3,
        name: "GEOGRAFIA"
      },
      {
        id: 4,
        name: "HISTÓRIA"
      },
      {
        id: 5,
        name: "CIÊNCIAS"
      },
      {
        id: 6,
        name: "EDUCAÇÃO FÍSICA"
      },
      {
        id: 7,
        name: "ARTE"
      },
      {
        id: 8,
        name: "LÍNGUA INGLESA"
      },
      {
        id: 9,
        name: "FÍSICA"
      },
      {
        id: 10,
        name: "QUÍMICA"
      },
      {
        id: 11,
        name: "BIOLOGIA"
      },
      {
        id: 12,
        name: "AVALIAÇÃO"
      },
      {
        id: 13,
        name: "PRODUÇÃO DE TEXTO"
      },
      {
        id: 14,
        name: "LÓGICA"
      },
      {
        id: 15,
        name: "MÚSICA"
      }
    ]

    await SchoolSubject.updateOrCreateMany('id', subjects);
  }
}
