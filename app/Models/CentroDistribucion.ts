import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Direccion from './Direccion'

export default class CentroDistribucion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public capacidadAlmacenamiento: number

  @column()
  public direccion_id: number

  @belongsTo(() => Direccion, {
    foreignKey: 'direccion_id'
  })
  public direcciones: BelongsTo<typeof Direccion>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
