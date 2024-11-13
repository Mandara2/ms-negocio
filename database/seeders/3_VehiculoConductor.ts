import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('vehiculos_conductores').insert([
      {
        fecha_inicio:new Date('2020-11-09'),
        fecha_fin: new Date('2018-09-20'),
        vehiculo_id: 1,
        conductor_id: 3
      },
      {
        fecha_inicio: new Date('2021-02-15'),
        fecha_fin: new Date('2021-08-20'),
        vehiculo_id: 2,
        conductor_id: 1
    },
    {
        fecha_inicio: new Date('2022-05-01'),
        fecha_fin: new Date('2022-10-10'),
        vehiculo_id: 3,
        conductor_id: 2
    },
    {
        fecha_inicio: new Date('2023-01-10'),
        fecha_fin: new Date('2023-06-15'),
        vehiculo_id: 4,
        conductor_id: 4
    },
    {
        fecha_inicio: new Date('2023-07-25'),
        fecha_fin: new Date('2024-01-05'),
        vehiculo_id: 5,
        conductor_id: 5
    }
    ])
  }
}
