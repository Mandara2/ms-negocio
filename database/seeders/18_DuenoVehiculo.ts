import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('duenos_vehiculos').insert([
      {
        id: 1,
        fecha_adquisicion: new Date ('2020-12-02'),
        porcentaje_propiedad: 50,
        vehiculo_id:1,
        dueno_id: 3
      },
      {
        id: 2,
        fecha_adquisicion: new Date('2021-03-15'),
        porcentaje_propiedad: 60,
        vehiculo_id: 2,
        dueno_id: 4
    },
    {
      id: 3,
        fecha_adquisicion: new Date('2019-07-10'),
        porcentaje_propiedad: 40,
        vehiculo_id: 3,
        dueno_id: 1
    },
    {
      id: 4,
        fecha_adquisicion: new Date('2022-01-20'),
        porcentaje_propiedad: 75,
        vehiculo_id: 4,
        dueno_id: 2
    },
    {
      id: 5,
        fecha_adquisicion: new Date('2020-06-18'),
        porcentaje_propiedad: 50,
        vehiculo_id: 5,
        dueno_id: 5
    }

    ])
  }
}
