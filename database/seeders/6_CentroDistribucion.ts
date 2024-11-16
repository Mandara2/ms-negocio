import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class CentroDistribucionSeeder extends BaseSeeder {
  public async run () {
    // Recuperamos algunas direcciones existentes
   
    // Creamos los centros de distribución y asignamos el `direccion_id`
    await Database.table('centros_distribucion').insert([
      {
        nombre: 'Centro de Distribución Norte',
        capacidad_almacenamiento: 1000.5,
        direccion_id: 1,
      },
      {
        nombre: 'Centro de Distribución Sur',
        capacidad_almacenamiento: 1500.0,
        direccion_id: 2,
      },
      {
        nombre: 'Centro de Distribución Este',
        capacidad_almacenamiento: 800.75,
        direccion_id: 3,
      },
      {
        nombre: 'Centro de Distribución Oeste',
        capacidad_almacenamiento: 1200.0,
        direccion_id: 4,
      },
      {
        nombre: 'Centro de Distribución Central',
        capacidad_almacenamiento: 600.25,
        direccion_id: 5,
      },
    ])
  }
}
