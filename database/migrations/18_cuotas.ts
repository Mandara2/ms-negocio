import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cuotas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.double('monto').notNullable()
      table.double('intereses')
      table.integer('numero').notNullable()
      table.integer('contrato_id').unsigned().references('contratos.id').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
