import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Departamento from 'App/Models/Departamento'

export default class DepartamentoSeeder extends BaseSeeder {
  public async run () {
    await Departamento.createMany([
      {
        nombre: 'Antioquia',
        region: 'Andina',
      },
      {
        nombre: 'Valle del Cauca',
        region: 'Pacífica',
      },
      {
        nombre: 'Atlántico',
        region: 'Caribe',
      },
      {
        nombre: 'Meta',
        region: 'Orinoquía',
      },
      {
        nombre: 'Amazonas',
        region: 'Amazonía',
      },
    ])
  }
}
