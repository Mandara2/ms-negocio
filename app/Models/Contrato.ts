import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente';
import Cuota from './Cuota';
import Ruta from './Ruta';

export default class Contrato extends BaseModel {
  public static table = 'contratos'  // Define explícitamente el nombre de la tabla

  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha: Date

  @column()
  public distancia_total: number

  @column()
  public costo_total: number

  @column()
  public latitude: number | null

  @column()
  public longitude: number | null 

  @column()
  public cliente_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @hasMany(() => Cuota, {
    foreignKey: 'contrato_id'
  })
  public cuotas: HasMany<typeof Cuota>

  @hasMany(() => Ruta, {
    foreignKey: 'contrato_id'
  })
  public rutas: HasMany<typeof Ruta>
}
