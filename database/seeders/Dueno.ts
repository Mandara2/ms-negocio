import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class DuenoSeeder extends BaseSeeder {
  public async run () {
    // Creamos los dueños con los atributos correspondientes
    await Database.table('duenos').insert([
      {
        telefono: '3161234567',
        fecha_nacimiento: new Date('1985-04-12'),
        conductor_id: 1,
        usuario_id: "6728e7a3bc0f3e155b567b24"
      },
      {
        telefono: '3172345678',
        fecha_nacimiento: new Date('1990-06-20'),
        conductor_id: 2,
        usuario_id: "6729689f1fff306b2ed2d80e"
      },
      {
        telefono: '3183456789',
        fecha_nacimiento: new Date('1988-09-15'),
        conductor_id: 3,
        usuario_id: "6729680f1fff306b2ed2d80c"
      },
      {
        telefono: '3194567890',
        fecha_nacimiento: new Date('1992-11-30'),
        conductor_id: 4,
        usuario_id: "672967ad1fff306b2ed2d80a"
      },
      {
        telefono: '3205678901',
        fecha_nacimiento: new Date('1980-01-05'),
        conductor_id: 5,
        usuario_id: "6728e88fbc0f3e155b567b27"
      },
    ])
  }
}
