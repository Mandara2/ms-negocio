import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('operaciones').insert([
      {
        id: 1,
        fecha_inicio:new Date('2024-09-08'),
        fecha_fin: new Date('2024-10-23'),
        municipio_id: 1,
        vehiculo_id: 4
      },
      {
        id: 2,
        fecha_inicio: new Date('2024-07-15'),
        fecha_fin: new Date('2024-08-30'),
        municipio_id: 5,
        vehiculo_id: 2
    },
    {
        id: 3,
        fecha_inicio: new Date('2024-05-01'),
        fecha_fin: new Date('2024-06-15'),
        municipio_id: 3,
        vehiculo_id: 1
    },
    { 
        ud: 4,
        fecha_inicio: new Date('2024-08-10'),
        fecha_fin: new Date('2024-09-25'),
        municipio_id: 4,
        vehiculo_id: 2
    },
    {
        id: 5,
        fecha_inicio: new Date('2024-10-01'),
        fecha_fin: new Date('2024-11-20'),
        municipio_id: 5,
        vehiculo_id: 3
    }
    ])
  }
}
