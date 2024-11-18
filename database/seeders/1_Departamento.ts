import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Departamento from 'App/Models/Departamento'

export default class DepartamentoSeeder extends BaseSeeder {
  public async run () {
    await Departamento.createMany([
      {
        id: 1,
        nombre: 'Antioquia',
        region: 'Andina',
      },
      {
        id: 2,
        nombre: 'Valle del Cauca',
        region: 'Pacífica',
      },
      {
        id: 3,
        nombre: 'Atlántico',
        region: 'Caribe',
      },
      {
        id: 4,
        nombre: 'Meta',
        region: 'Orinoquía',
      },
      {
        id: 5,
        nombre: 'Amazonas',
        region: 'Amazonía',
      },
    ])
  }
}
