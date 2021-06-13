import School from "App/Models/School";
import SchoolType from "App/Models/SchoolType";
import axios from "axios";
import _ from "lodash"

const URL_NAME = "http://educacao.dadosabertosbr.com/api/escolas"
const URL_COD = "http://educacao.dadosabertosbr.com/api/escola"

export default class SchoolAPI {
  static async getSchools(query: { name: string | undefined, cod: number | undefined }) {
    let searchType = "";

    if (query.name != undefined && (query.name?.length || 0) <= 4) {
      throw new Error("Tamanho da Busca Tem Que Ser Maior que Quatro Letras");
    }
    try {
      if (query.name && !query.cod) {
        searchType = "name"
        await this.getSchoolsByName(query.name)
      }

      if (query.cod) {
        searchType = "cod"
        await this.getSchoolsByCod(query.cod)
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      if (searchType === 'name') {
        return await School.query().whereRaw(`name LIKE '%${query.name}%'`).limit(10)
      } else {
        return await School.findBy('id', query.cod)
      }
    }
  }

  static async getSchoolsByName(name: string) {
    try {
      let { data } = await axios.get(URL_NAME, { params: { nome: name } });

      const mappedData = []

      for (const school of data[1]) {
        const type = await SchoolType.findBy('name', school.dependenciaAdministrativaTxt)

        const data = {
          id: school.cod,
          name: school.nome,
          city_id: school.codCidade,
          school_type_id: type?.id
        }

        mappedData.push(data);
      }

      await School.fetchOrCreateMany('id', mappedData);
    } catch (error) {
      throw new Error("Erro Na API educacao.dadosabertosbr");
    }
  }

  static async getSchoolsByCod(cod: number) {
    try {
      let { data } = await axios.get(`${URL_COD}/${cod}`);
      const type = await SchoolType.findBy('name', data.dependenciaAdministrativaTxt)

      const school = {
        id: data.cod,
        name: data.nome,
        city_id: data.codMunicipio,
        school_type_id: type?.id
      }

      await School.firstOrCreate(school)
    } catch (error) {
      throw new Error("Erro Na API educacao.dadosabertosbr");
    }
  }
}

