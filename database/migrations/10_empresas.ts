import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'empresas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nit').notNullable()
      table.string('tipoEmpresa').notNullable()
      table.string('direccionFiscal')
      //table.integer('cliente_id').unsigned().references('clientes.id')
      //table.integer('personaNatural_id').unsigned().references('personaNatural.id')
      
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
