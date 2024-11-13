import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_inicio: String

  @column()
  public fecha_fin: String

  @column()
  public conductor_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Conductor,{
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>

}
