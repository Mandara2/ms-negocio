import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import PersonaNatural from './PersonaNatural'

export default class Empresa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nit: string

  @column()
  public tipoEmpresa: string

  @column()
  public direccionFiscal: string

  @column()
  public cliente_id: string

  @column()
  public personaNatural_id: string

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @belongsTo(() => PersonaNatural, {
    foreignKey: 'cliente_id'
  })
  public PersonaNatural: BelongsTo<typeof PersonaNatural>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
