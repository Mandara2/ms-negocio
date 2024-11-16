import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class EmpresaSeeder extends BaseSeeder {
  public async run () {
    // Creamos las empresas con los atributos correspondientes
    await Database.table('empresas').insert([
      {
        id: 1,
        nit: '900123456-1',
        tipo_empresa: 'hotel',
        direccion_fiscal: 'Calle 10 # 20-30, Bogotá',
        cliente_id: 1, // Asegúrate de que este cliente exista en la tabla clientes
        persona_natural_id: 1, // Asegúrate de que esta persona natural exista en la tabla personaNatural
      },
      {
        id: 2,
        nit: '901234567-2',
        tipo_empresa: 'restaurante',
        direccion_fiscal: 'Carrera 15 # 30-40, Medellín',
        cliente_id: 2, // Asegúrate de que este cliente exista
        persona_natural_id: 2, // Asegúrate de que esta persona natural exista
      },
      {
        id: 3,
        nit: '902345678-3',
        tipo_empresa: 'cafetería',
        direccion_fiscal: 'Avenida 5 # 10-20, Cali',
        cliente_id: 3, // Asegúrate de que este cliente exista
        persona_natural_id: 3, // Asegúrate de que esta persona natural exista
      },
      {
        id: 4,
        nit: '903456789-4',
        tipo_empresa: 'bar',
        direccion_fiscal: 'Calle 7 # 25-35, Barranquilla',
        cliente_id: 4, // Asegúrate de que este cliente exista
        persona_natural_id: 4, // Asegúrate de que esta persona natural exista
      },
      {
        id: 5,
        nit: '904567890-5',
        tipo_empresa: 'sala de eventos',
        direccion_fiscal: 'Transversal 2 # 12-34, Cartagena',
        cliente_id: 5, // Asegúrate de que este cliente exista
        persona_natural_id: 5, // Asegúrate de que esta persona natural exista
      },
    ])
  }
}
