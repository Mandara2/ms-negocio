import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Conductor from 'App/Models/Conductor'

export default class ConductorSeeder extends BaseSeeder {
  public async run () {
    // Creamos los conductores con los atributos correspondientes
    await Conductor.createMany([
      {
        telefono: '3112345678',
        numeroLicencia: '123456789', // Solo números
        fechaVencimientoLicencia: new Date('2025-12-31'),
        fechaNacimiento: new Date('1990-01-15'),
      },
      {
        telefono: '3123456789',
        numeroLicencia: '987654321', // Solo números
        fechaVencimientoLicencia: new Date('2024-11-30'),
        fechaNacimiento: new Date('1985-05-20'),
      },
      {
        telefono: '3134567890',
        numeroLicencia: '456789123', // Solo números
        fechaVencimientoLicencia: new Date('2026-01-31'),
        fechaNacimiento: new Date('1980-10-10'),
      },
      {
        telefono: '3145678901',
        numeroLicencia: '321654987', // Solo números
        fechaVencimientoLicencia: new Date('2025-03-15'),
        fechaNacimiento: new Date('1992-08-25'),
      },
      {
        telefono: '3156789012',
        numeroLicencia: '654321789', // Solo números
        fechaVencimientoLicencia: new Date('2023-07-19'),
        fechaNacimiento: new Date('1988-12-30'),
      },
    ])
  }
}
