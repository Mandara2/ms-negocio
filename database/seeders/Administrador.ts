import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Administrador from 'App/Models/Administrador'

export default class AdministradorSeeder extends BaseSeeder {
  public async run () {
    // Creamos los administradores con los atributos correspondientes
    await Administrador.createMany([
      {
        tipo: 'gerente de hotel',
        telefono: '3001234567',
      },
      {
        tipo: 'gerente de restaurante',
        telefono: '3102345678',
      },
      {
        tipo: 'coordinador de eventos',
        telefono: '3203456789',
      },
      {
        tipo: 'administrador de bar',
        telefono: '3304567890',
      },
      {
        tipo: 'supervisor de limpieza',
        telefono: '3405678901',
      },
    ])
  }
}
