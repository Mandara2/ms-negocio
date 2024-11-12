import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Municipio from './Municipio'

export default class Operacion extends BaseModel {

  public static table = 'operaciones';

  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_inicio:Date

  @column()
  public fecha_fin:Date

  @column()
  public municipio_id:number

  @column()
  public vehiculo_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Vehiculo,{
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>

  @belongsTo(()=> Municipio,{
    foreignKey: 'municipio_id'
  })
  public municipio: BelongsTo<typeof Municipio>
}
