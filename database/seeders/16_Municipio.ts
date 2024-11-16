import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Municipio from 'App/Models/Municipio'

export default class MunicipioSeeder extends BaseSeeder {
  public async run () {

    // Creamos los municipios y asignamos el `departamento_id`
    await Municipio.createMany([
      { nombre: 'Medellín', codigoPostal: '050001', departamento_id: 1},
      { nombre: 'Cali', codigoPostal: '760001', departamento_id: 2},
      { nombre: 'Barranquilla', codigoPostal: '080001', departamento_id: 3},
      { nombre: 'Envigado', codigoPostal: '055422', departamento_id: 4},
      { nombre: 'Palmira', codigoPostal: '763531', departamento_id: 5},
    ])
  }
}
