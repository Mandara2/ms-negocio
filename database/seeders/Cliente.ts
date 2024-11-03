import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cliente from 'App/Models/Cliente'

export default class ClienteSeeder extends BaseSeeder {
  public async run () {
    // Creamos los clientes con los atributos correspondientes
    await Cliente.createMany([
      {
        telefono: '3012345678',
        cantidadPedidosRealizados: 5,
      },
      {
        telefono: '3023456789',
        cantidadPedidosRealizados: 10,
      },
      {
        telefono: '3034567890',
        cantidadPedidosRealizados: 15,
      },
      {
        telefono: '3045678901',
        cantidadPedidosRealizados: 20,
      },
      {
        telefono: '3056789012',
        cantidadPedidosRealizados: 10,
      },
    ])
  }
}
