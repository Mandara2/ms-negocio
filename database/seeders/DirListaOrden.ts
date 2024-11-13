import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('dir_lista_ordenes').insert([
      {
        orden: 1,
        descripcion: '',
        ruta_id: 6,
        direccion_id:3

      },
      {
        orden: 2,
        descripcion: '',
        ruta_id: 7,
        direccion_id: 3
    },
    {
        orden: 3,
        descripcion: '',
        ruta_id: 8,
        direccion_id: 4
    },
    {
        orden: 4,
        descripcion: '',
        ruta_id: 9,
        direccion_id: 5
    },
    {
        orden: 5,
        descripcion: '',
        ruta_id: 10,
        direccion_id: 1
    }
    
    ])
  }
}
