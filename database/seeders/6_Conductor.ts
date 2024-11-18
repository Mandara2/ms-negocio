import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class ConductorSeeder extends BaseSeeder {
  public async run () {
    // Creamos los conductores con los atributos correspondientes
    await Database.table('conductores').insert([
      {
        id: 1,
        telefono: '3112345678',
        numero_licencia: '123456789', // Solo números
        fecha_vencimiento_licencia: new Date('2025-12-31'),
        fecha_nacimiento: new Date('1990-01-15'),
        usuario_id: "6718f802175a5a04241b6919"
      },
      {
        id: 2,
        telefono: '3123456789',
        numero_licencia: '987654321', // Solo números
        fecha_vencimiento_licencia: new Date('2024-11-30'),
        fecha_nacimiento: new Date('1985-05-20'),
        usuario_id: "6728e7a3bc0f3e155b567b24"
      },
      {
        id: 3,
        telefono: '3134567890',
        numero_licencia: '456789123', // Solo números
        fecha_vencimiento_licencia: new Date('2026-01-31'),
        fecha_nacimiento: new Date('1980-10-10'),
        usuario_id: "6728e88fbc0f3e155b567b27"
      },
      {
        id: 4,
        telefono: '3145678901',
        numero_licencia: '321654987', // Solo números
        fecha_vencimiento_licencia: new Date('2025-03-15'),
        fecha_nacimiento: new Date('1992-08-25'),
        usuario_id: "672967ad1fff306b2ed2d80a"
      },
      {
        id: 5,
        telefono: '3156789012',
        numero_licencia: '654321789', // Solo números
        fecha_vencimiento_licencia: new Date('2023-07-19'),
        fecha_nacimiento: new Date('1988-12-30'),
        usuario_id: "6729680f1fff306b2ed2d80c"
      },
    ])
  }
}
