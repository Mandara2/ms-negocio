import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('rutas').insert([
      {
        id: 1,
        punto_inicio: 'cr2 #16-20',
        punto_destino: 'cr3 #20-13',
        distancia: 30,
        fecha_entrega: new Date('2024-09-12'),
        contrato_id:1,
        vehiculo_conductor_id:1
      },
      {
        id: 2,
        punto_inicio: 'cll10 #30-15',
        punto_destino: 'cr15 #40-25',
        distancia: 45,
        fecha_entrega: new Date('2024-09-15'),
        contrato_id: 2,
        vehiculo_conductor_id: 2
    },
    {
      id: 3,
        punto_inicio: 'cr5 #22-30',
        punto_destino: 'cll7 #18-40',
        distancia: 25,
        fecha_entrega: new Date('2024-10-05'),
        contrato_id: 3,
        vehiculo_conductor_id: 3
    },
    {
      id: 4,
        punto_inicio: 'av6 #11-19',
        punto_destino: 'cr2 #33-10',
        distancia: 35,
        fecha_entrega: new Date('2024-10-20'),
        contrato_id: 4,
        vehiculo_conductor_id: 4
    },
    {
      id: 5,
        punto_inicio: 'cr10 #5-27',
        punto_destino: 'cll3 #12-22',
        distancia: 40,
        fecha_entrega: new Date('2024-11-02'),
        contrato_id: 5,
        vehiculo_conductor_id: 5
    }
    ])
  }
}
