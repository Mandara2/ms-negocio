import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class PersonaNaturalSeeder extends BaseSeeder {
  public async run () {
    // Creamos las personas naturales con los atributos correspondientes
    await Database.table('personas_naturales').insert([
      {
        id: 1,
        identificacion: '123456789',
        tipo_documento: 'Cédula de Ciudadanía',
        fecha_nacimiento: new Date('1985-05-15'),
        usuario_id: "6728e7a3bc0f3e155b567b24",
        empresa_id: 1
      },
      {
        id: 2,
        identificacion: '987654321',
        tipo_documento: 'Cédula de Ciudadanía',
        fecha_nacimiento: new Date('1990-10-20'),
        usuario_id: "6728e88fbc0f3e155b567b27",
        empresa_id: 2
      },
      {
        id: 3,
        identificacion: '1122334455',
        tipo_documento: 'Cédula de Extranjería',
        fecha_nacimiento: new Date('1988-03-30'),
        usuario_id: "672967ad1fff306b2ed2d80a",
        empresa_id: 3
      },
      {
        id: 4,
        identificacion: '2233445566',
        tipo_documento: 'Pasaporte',
        fecha_nacimiento: new Date('1995-07-25'),
        usuario_id: "6729680f1fff306b2ed2d80c",
        empresa_id: 4
      },
      {
        id: 5,
        identificacion: '3344556677',
        tipo_documento: 'Cédula de Ciudadanía',
        fecha_nacimiento: new Date('2000-12-01'),
        usuario_id: "6729689f1fff306b2ed2d80e",
        empresa_id: 5
      },
    ])
  }
}
