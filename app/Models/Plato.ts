import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import PlatoRestaurante from './PlatoRestaurante'

export default class Plato extends BaseModel {

  public static table = ' platos'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @hasMany(() => PlatoRestaurante, {
    foreignKey: 'plato_id'
  })
  public platoRestaurante: HasMany<typeof PlatoRestaurante>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
