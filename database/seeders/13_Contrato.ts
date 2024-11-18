import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('contratos').insert([
      {
        id: 1,
        fecha: new Date('2023-10-02'),
        distancia_total: 300,
        costo_total:100000,
        cliente_id:1
      },
      {
        id: 2,
        fecha: new Date ('2023-05-17'),
        distancia_total: 653,
        costo_total: 8754320,
        cliente_id: 3
      },
      {
        id: 3,
        fecha: new Date ('2023-11-30'),
        distancia_total: 215,
        costo_total: 456780,
        cliente_id: 2
      },
      {
        id: 4,
        fecha: new Date('2024-02-12'),
        distancia_total: 1345,
        costo_total: 9900000,
        cliente_id: 1
      },
      {
        id: 5,
        fecha: new Date( '2024-08-09'),
        distancia_total: 899,
        costo_total: 325600,
        cliente_id: 5
      }
      
      
      
    ])
  }
}
