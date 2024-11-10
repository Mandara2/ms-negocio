import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rutas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('punto_inicio')
      table.string('punto_destino')
      table.double('distancia')
      table.date('fecha_entrega')
      table.integer('contrato_id').unsigned().references('contratos.id')
      table.integer('vehiculo_conductor_id').unsigned().references('vehiculos_conductores.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
