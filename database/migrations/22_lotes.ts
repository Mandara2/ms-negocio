import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'lotes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.double('peso').notNullable()
      table.double('volumen').notNullable()
      table.integer('dir_lista_orden_id').unsigned().references('dir_lista_ordenes.id').notNullable()
      //table.integer('lote_id').unsigned().references('lotes').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
