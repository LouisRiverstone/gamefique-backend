import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import City from 'App/Models/City'
import State from 'App/Models/State'
import CitiesAndStates from "../data/CitiesAndStates"

export default class CitiesAndStateSeeder extends BaseSeeder {
  public async run() {

    for (const city_data of CitiesAndStates) {
      const state_data = {
        id: city_data.microrregiao.mesorregiao.UF.id,
        acronym: city_data.microrregiao.mesorregiao.UF.sigla,
        name: city_data.microrregiao.mesorregiao.UF.nome
      }

      let state = await State.find(state_data.id);

      if (!state) {
        state = await State.create(state_data);
      }

      const city = await City.find(city_data.id);

      if (!city) {
        await City.create({
          id: city_data.id,
          state_id: state.id,
          name: city_data.nome
        });
      }
    }
  }
}
