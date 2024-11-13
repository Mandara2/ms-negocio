import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'empresas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nit').notNullable()
      table.string('tipo_empresa').notNullable()
      table.string('direccion_fiscal')
      table.integer('cliente_id').unsigned().references('clientes.id')
      table.integer('persona_natural_id').unsigned().references('personas_naturales.id')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.alterTable('empresas', (table) => {
      table.dropForeign(['cliente_id'])
    })
    this.schema.dropTable('empresas')
  }
}
