import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PersonaNatural from 'App/Models/PersonaNatural'

export default class PersonaNaturalSeeder extends BaseSeeder {
  public async run () {
    // Creamos las personas naturales con los atributos correspondientes
    await PersonaNatural.createMany([
      {
        identificacion: '123456789',
        tipoDocumento: 'Cédula de Ciudadanía',
        fechaNacimiento: new Date('1985-05-15'),
      },
      {
        identificacion: '987654321',
        tipoDocumento: 'Cédula de Ciudadanía',
        fechaNacimiento: new Date('1990-10-20'),
      },
      {
        identificacion: '1122334455',
        tipoDocumento: 'Cédula de Extranjería',
        fechaNacimiento: new Date('1988-03-30'),
      },
      {
        identificacion: '2233445566',
        tipoDocumento: 'Pasaporte',
        fechaNacimiento: new Date('1995-07-25'),
      },
      {
        identificacion: '3344556677',
        tipoDocumento: 'Cédula de Ciudadanía',
        fechaNacimiento: new Date('2000-12-01'),
      },
    ])
  }
}
