import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'duenos_vehiculos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('fecha_adquisicion').notNullable()
      table.integer('porcentaje_propiedad').notNullable()
      table.integer('vehiculo_id').unsigned().references('vehiculos.id').notNullable().onDelete('CASCADE')
      table.integer('dueno_id').unsigned().references('duenos.id').notNullable().onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
