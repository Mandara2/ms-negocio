import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rutas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('punto_inicio').notNullable()
      table.string('punto_destino').notNullable()
      table.double('distancia').notNullable()
      table.date('fecha_entrega').notNullable()
      table.integer('contrato_id').unsigned().references('contratos.id').notNullable().onDelete('CASCADE')
      table.integer('vehiculo_conductor_id').unsigned().references('vehiculos_conductores.id').notNullable().onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
