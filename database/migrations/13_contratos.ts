import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'contratos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('fecha').notNullable()
      table.double('distancia_total').notNullable()
      table.double('costo_total').notNullable()
      table.integer('cliente_id').unsigned().references("clientes.id").notNullable().onDelete('CASCADE')
      table.double('longitude')
      table.double('latitude')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
