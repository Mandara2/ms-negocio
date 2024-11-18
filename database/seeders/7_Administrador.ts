import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'


export default class AdministradorSeeder extends BaseSeeder {
  public async run () {
    // Creamos los administradores con los atributos correspondientes
    await Database.table('administradores').insert([
      {
        id: 1,
        tipo: 'gerente de hotel',
        telefono: '3001234567',
        usuario_id: 1
      },
      {
        id: 2,
        tipo: 'gerente de restaurante',
        telefono: '3102345678',
        usuario_id: 2
      },
      {
        id: 3,
        tipo: 'coordinador de eventos',
        telefono: '3203456789',
        usuario_id: 3
      },
      {
        id: 4,
        tipo: 'administrador de bar',
        telefono: '3304567890',
        usuario_id: 4
      },
      {
        id: 5,
        tipo: 'supervisor de limpieza',
        telefono: '3405678901',
        usuario_id: 5
      },
    ])
  }
}
