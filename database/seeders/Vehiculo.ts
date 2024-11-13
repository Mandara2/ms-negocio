import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('vehiculos').insert([
      {
        matricula: 'FTZ006L',
        modelo: 'audi',
        capacidad_carga: 5,
        tipo_carga: 'Alimentos'
      },
      {
        matricula: "GYH123K",
        modelo: "BMW",
        capacidad_carga: 7,
        tipo_carga: "Materiales"
      },
      {
        matricula: "JHK982M",
        modelo: "Mercedes-Benz",
        capacidad_carga: 10,
        tipo_carga: "Maquinaria"
      },
      {
        matricula: "LRX435P",
        modelo: "Toyota",
        capacidad_carga: 3,
        tipo_carga: "Electrónicos"
      },
      {
        matricula: "QWE761D",
        modelo: "Ford",
        capacidad_carga: 8,
        tipo_carga: "Medicamentos"
      }
    ])
  }
}
