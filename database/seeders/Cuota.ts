import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.table('contratos').insert([
      {
        monto: '120000',
        intereses: '2000',
        numero: '3',
        contrato_id:1
      },
      {
        monto: '150000',
        intereses: '2500',
        numero: '4',
        contrato_id: 2
    },
    {
        monto: '180000',
        intereses: '3000',
        numero: '5',
        contrato_id: 3
    },
    {
        monto: '200000',
        intereses: '3500',
        numero: '6',
        contrato_id: 4
    },
    {
        monto: '220000',
        intereses: '4000',
        numero: '7',
        contrato_id: 5
    }

    ])
  }
}
