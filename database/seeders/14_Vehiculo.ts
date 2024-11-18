import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('vehiculos').insert([
      {
        id: 1,
        matricula: 'FTZ006L',
        modelo: 'audi',
        capacidad_carga: 5,
        tipo_carga: 'Alimentos'
      },
      {
        id: 2,
        matricula: "GYH123K",
        modelo: "BMW",
        capacidad_carga: 7,
        tipo_carga: "Materiales"
      },
      {
        id: 3,
        matricula: "JHK982M",
        modelo: "Mercedes-Benz",
        capacidad_carga: 10,
        tipo_carga: "Maquinaria"
      },
      {
        id: 4,
        matricula: "LRX435P",
        modelo: "Toyota",
        capacidad_carga: 3,
        tipo_carga: "Electrónicos"
      },
      {
        id: 5,
        matricula: "QWE761D",
        modelo: "Ford",
        capacidad_carga: 8,
        tipo_carga: "Medicamentos"
      }
    ])
  }
}
