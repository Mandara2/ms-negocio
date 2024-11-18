import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import PersonaNatural from './PersonaNatural'

export default class Empresa extends BaseModel {

  public static table = 'empresas';

  @column({ isPrimary: true })
  public id: number

  @column()
  public nit: string

  @column()
  public tipo_empresa: string

  @column()
  public direccion_fiscal: string

  @column()
  public cliente_id: number

  @column()
  public persona_natural_id: number

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
