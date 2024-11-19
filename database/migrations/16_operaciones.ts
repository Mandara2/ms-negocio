import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'operaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('fecha_inicio').notNullable()
      table.date('fecha_fin')
      table.integer('municipio_id').unsigned().references('municipios.id').notNullable().onDelete('CASCADE')
      table.integer('vehiculo_id').unsigned().references('vehiculos.id').notNullable().onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
