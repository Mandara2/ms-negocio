import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Empresa from './Empresa'

export default class PersonaNatural extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public identificacion: string

  @column()
  public tipoDocumento: string

  @column()
  public fechaNacimiento: Date

  @column()
  public cliente_id: string

  //Revisaaaaaaaaaaaaar

  @hasOne(() => Empresa, {
    foreignKey: 'empresa_id'
  })
  public empresa: HasOne<typeof Empresa>  

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
