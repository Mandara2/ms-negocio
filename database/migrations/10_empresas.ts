import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'empresas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nit').notNullable()
      table.string('tipoEmpresa').notNullable()
      table.string('direccionFiscal')
      table.string('cliente_id').unsigned().references('clientes.id')
      table.string('personaNatural_id').unsigned().references('personaNatural.id')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
