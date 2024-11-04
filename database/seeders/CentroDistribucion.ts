import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CentroDistribucion from 'App/Models/CentroDistribucion'
import Direccion from 'App/Models/Direccion'

export default class CentroDistribucionSeeder extends BaseSeeder {
  public async run () {
    // Recuperamos algunas direcciones existentes
    const direccion1 = await Direccion.find(1) // Suponiendo que el ID 1 es una dirección válida
    const direccion2 = await Direccion.find(2) // Suponiendo que el ID 2 es otra dirección válida
    const direccion3 = await Direccion.find(3) // Suponiendo que el ID 3 es otra dirección válida

    // Creamos los centros de distribución y asignamos el `direccion_id`
    await CentroDistribucion.createMany([
      {
        nombre: 'Centro de Distribución Norte',
        capacidadAlmacenamiento: 1000.5,
        direccion_id: direccion1?.id!,
      },
      {
        nombre: 'Centro de Distribución Sur',
        capacidadAlmacenamiento: 1500.0,
        direccion_id: direccion2?.id!,
      },
      {
        nombre: 'Centro de Distribución Este',
        capacidadAlmacenamiento: 800.75,
        direccion_id: direccion3?.id!,
      },
      {
        nombre: 'Centro de Distribución Oeste',
        capacidadAlmacenamiento: 1200.0,
        direccion_id: direccion1?.id!,
      },
      {
        nombre: 'Centro de Distribución Central',
        capacidadAlmacenamiento: 600.25,
        direccion_id: direccion2?.id!,
      },
    ])
  }
}
