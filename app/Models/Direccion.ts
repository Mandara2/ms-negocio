import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import CentroDistribucion from './CentroDistribucion'
import Municipio from './Municipio'

export default class Direccione extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public localidad: string

  @column()
  public tipo_direccion: string

  @column()
  public calle: string

  @column()
  public numero_direccion: string

  @column()
  public referencias: string

  @column()
  public municipio_id: number
  
  @hasOne(() => CentroDistribucion, {
    foreignKey: 'direccion_id'
  })
  public centrosDistribucion: HasOne <typeof CentroDistribucion>

  @belongsTo(() => Municipio, {
      foreignKey: 'municipio_id'
    })
  public municipio: BelongsTo<typeof Municipio>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
