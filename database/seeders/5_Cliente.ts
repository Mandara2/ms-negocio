import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class ClienteSeeder extends BaseSeeder {
  public async run () {
    // Creamos los clientes con los atributos correspondientes
    await Database.table('clientes').insert([
      {
        id: 1,
        telefono: '3012345678',
        cantidad_pedidos_realizados: 5,
        usuario_id: "6728e7a3bc0f3e155b567b24"
      },
      {
        id: 2,
        telefono: '3023456789',
        cantidad_pedidos_realizados: 10,
        usuario_id: "6728e88fbc0f3e155b567b27"
      },
      {
        id: 3,
        telefono: '3034567890',
        cantidad_pedidos_realizados: 15,
        usuario_id: "672967ad1fff306b2ed2d80a"
      },
      {
        id:4 ,
        telefono: '3045678901',
        cantidad_pedidos_realizados: 20,
        usuario_id: "6729689f1fff306b2ed2d80e"
      },
      {
        id: 5,
        telefono: '3056789012',
        cantidad_pedidos_realizados: 10,
        usuario_id: "6729680f1fff306b2ed2d80c"
      },
    ])
  }
}
