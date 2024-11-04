import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Municipio from 'App/Models/Municipio'
import Departamento from 'App/Models/Departamento'

export default class MunicipioSeeder extends BaseSeeder {
  public async run () {
    // Recuperamos los departamentos que se acaban de crear en el DepartamentoSeeder
    const antioquia = await Departamento.findBy('nombre', 'Antioquia')
    const valleDelCauca = await Departamento.findBy('nombre', 'Valle del Cauca')
    const atlantico = await Departamento.findBy('nombre', 'Atlántico')

    // Creamos los municipios y asignamos el `departamento_id`
    await Municipio.createMany([
      { nombre: 'Medellín', codigoPostal: '050001', departamento_id: antioquia?.id},
      { nombre: 'Cali', codigoPostal: '760001', departamento_id: valleDelCauca?.id},
      { nombre: 'Barranquilla', codigoPostal: '080001', departamento_id: atlantico?.id},
      { nombre: 'Envigado', codigoPostal: '055422', departamento_id: antioquia?.id},
      { nombre: 'Palmira', codigoPostal: '763531', departamento_id: valleDelCauca?.id},
    ])
  }
}
