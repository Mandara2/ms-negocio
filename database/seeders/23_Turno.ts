import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'


export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('turnos').insert([
      {
        id: 1,
        fecha_inicio: new Date('2023-12-09T07:00:00'),
        fecha_fin:new Date('2023-12-09T23:00:00'),
        conductor_id:1
      },
      {
        id: 2,
        fecha_inicio: new Date('2023-12-10T08:00:00'),
        fecha_fin: new Date('2023-12-10T18:00:00'),
        conductor_id: 2
    },
    {
      id: 3,
        fecha_inicio: new Date('2023-12-11T09:00:00'),
        fecha_fin: new Date('2023-12-11T19:00:00'),
        conductor_id: 3
    },
    {
      id: 4,
        fecha_inicio: new Date('2023-12-12T06:00:00'),
        fecha_fin: new Date('2023-12-12T20:00:00'),
        conductor_id: 4
    },
    {
      id: 5,
        fecha_inicio: new Date('2023-12-13T10:00:00'),
        fecha_fin: new Date('2023-12-13T22:00:00'),
        conductor_id: 5
    }
    ])
  }
}
