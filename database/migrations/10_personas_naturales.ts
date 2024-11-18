import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'personas_naturales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('usuario_id').notNullable()
      table.string('identificacion').notNullable()
      table.string('tipo_documento').notNullable()
      table.date('fecha_nacimiento').notNullable()
      table.integer('cliente_id').unsigned().references('clientes.id')
      table.integer('empresa_id').unsigned().references('empresa_id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
