import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FormationCoursesArea from 'App/Models/FormationCoursesArea'



export default class FormationCoursesAreaSeeder extends BaseSeeder {

  public async run () {
    const areas = [
      {id:1, name: "Educação"},
      {id:2, name: "Humanidades e Artes"},
      {id:3, name: "Ciências Sociais, Negócios e Direitos"},
      {id:4, name: "Ciências, Matemática e Computação"},
      {id:5, name: "Engenharia, Produção e Construção"},
      {id:6, name: "Agricultura e Veterinária"},
      {id:7, name: "Saúde e Bem-estar Social"},
      {id:8, name: "Serviços"},
      {id:999, name: "Outros"}
    ]
    
    await FormationCoursesArea.updateOrCreateMany('id', areas);
  }
}
