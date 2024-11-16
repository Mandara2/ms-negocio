import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('lotes').insert([
      {
        id: 1,
        peso:4,
        volumen:80,
        dir_lista_orden_id:21
      },
      {
        id: 2,
        peso: 5,
        volumen: 90,
        dir_lista_orden_id: 22
    },
    {
        id: 3,
        peso: 3.5,
        volumen: 75,
        dir_lista_orden_id: 23
    },
    {
        id: 4,
        peso: 6,
        volumen: 85,
        dir_lista_orden_id: 24
    },
    {
        id: 5,
        peso: 4.5,
        volumen: 95,
        dir_lista_orden_id: 25
    }
    ])
  }
}
