import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gastos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('detalles')
      table.integer('dueno_id').unsigned().references('duenos.id')
      table.integer('conductor_id').unsigned().references('conductores.id')
      table.integer('servicio_id').unsigned().references('servicios.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
