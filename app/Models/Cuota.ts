import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'

export default class Cuota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public monto:number

  @column()
  public intereses:number

  @column()
  public numero:number

  @column()
  public contrato_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Contrato,{
    foreignKey: 'contrato_id'
  })
  public contrato: BelongsTo<typeof Contrato>
}
