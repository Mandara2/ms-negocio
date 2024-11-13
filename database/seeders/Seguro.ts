import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('seguros').insert([
      {
        fecha_inicio: new Date('2024-03-10'),
        fecha_fin: new Date('2024-12-09'),
        compania_aseguradora: 'Sura',
        vehiculo_id:1

      },
      {
        fecha_inicio: new Date('2024-01-15'),
        fecha_fin: new Date('2024-10-14'),
        compania_aseguradora: 'SOAT',
        vehiculo_id: 2
    },
    {
        fecha_inicio: new Date('2024-05-20'),
        fecha_fin: new Date('2025-02-19'),
        compania_aseguradora: 'SOAT',
        vehiculo_id: 3
    },
    {
        fecha_inicio: new Date('2024-02-01'),
        fecha_fin: new Date('2024-11-30'),
        compania_aseguradora: 'Sura',
        vehiculo_id: 4
    },
    {
        fecha_inicio: new Date('2024-04-10'),
        fecha_fin: new Date('2025-01-09'),
        compania_aseguradora: 'Sura',
        vehiculo_id: 5
    }

    ])
  }
}
