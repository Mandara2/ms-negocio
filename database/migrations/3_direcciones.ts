import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'direcciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('localidad').notNullable()
      table.string('tipoDireccion').notNullable()
      table.string('calle').notNullable()
      table.string('numeroDireccion').notNullable()
      table.string('referencias')
      table.integer('municipio_id').unsigned().references('municipios.id').onDelete('CASCADE').notNullable()
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
