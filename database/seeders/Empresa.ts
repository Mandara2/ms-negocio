import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Empresa from 'App/Models/Empresa'

export default class EmpresaSeeder extends BaseSeeder {
  public async run () {
    // Creamos las empresas con los atributos correspondientes
    await Empresa.createMany([
      {
        nit: '900123456-1',
        tipoEmpresa: 'hotel',
        direccionFiscal: 'Calle 10 # 20-30, Bogotá',
        cliente_id: '1', // Asegúrate de que este cliente exista en la tabla clientes
        personaNatural_id: '1', // Asegúrate de que esta persona natural exista en la tabla personaNatural
      },
      {
        nit: '901234567-2',
        tipoEmpresa: 'restaurante',
        direccionFiscal: 'Carrera 15 # 30-40, Medellín',
        cliente_id: '2', // Asegúrate de que este cliente exista
        personaNatural_id: '2', // Asegúrate de que esta persona natural exista
      },
      {
        nit: '902345678-3',
        tipoEmpresa: 'cafetería',
        direccionFiscal: 'Avenida 5 # 10-20, Cali',
        cliente_id: '3', // Asegúrate de que este cliente exista
        personaNatural_id: '3', // Asegúrate de que esta persona natural exista
      },
      {
        nit: '903456789-4',
        tipoEmpresa: 'bar',
        direccionFiscal: 'Calle 7 # 25-35, Barranquilla',
        cliente_id: '4', // Asegúrate de que este cliente exista
        personaNatural_id: '4', // Asegúrate de que esta persona natural exista
      },
      {
        nit: '904567890-5',
        tipoEmpresa: 'sala de eventos',
        direccionFiscal: 'Transversal 2 # 12-34, Cartagena',
        cliente_id: '5', // Asegúrate de que este cliente exista
        personaNatural_id: '5', // Asegúrate de que esta persona natural exista
      },
    ])
  }
}
