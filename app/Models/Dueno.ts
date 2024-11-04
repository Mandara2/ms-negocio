import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'

export default class Dueno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public telefono: string

  @column()
  public fechaNacimiento: Date

  @column()
  public conductor_id: number

  @belongsTo(() => Conductor, {
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
