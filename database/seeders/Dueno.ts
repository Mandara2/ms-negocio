import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dueno from 'App/Models/Dueno'

export default class DuenoSeeder extends BaseSeeder {
  public async run () {
    // Creamos los dueños con los atributos correspondientes
    await Dueno.createMany([
      {
        telefono: '3161234567',
        fechaNacimiento: new Date('1985-04-12'),
        conductor_id: 1, // Asegúrate de que este ID existe en la tabla de conductores
      },
      {
        telefono: '3172345678',
        fechaNacimiento: new Date('1990-06-20'),
        conductor_id: 2,
      },
      {
        telefono: '3183456789',
        fechaNacimiento: new Date('1988-09-15'),
        conductor_id: 3,
      },
      {
        telefono: '3194567890',
        fechaNacimiento: new Date('1992-11-30'),
        conductor_id: 4,
      },
      {
        telefono: '3205678901',
        fechaNacimiento: new Date('1980-01-05'),
        conductor_id: 5,
      },
    ])
  }
}
