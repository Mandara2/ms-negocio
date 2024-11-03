import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Dueno from './Dueno'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public telefono: string

  @column()
  public numeroLicencia: string

  @column()
  public fechaVencimientoLicencia: Date

  @column()
  public fechaNacimiento: Date

  @hasOne(() => Dueno, {
    foreignKey: 'conductor_id'
  })
  public dueno: HasOne<typeof Dueno>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
