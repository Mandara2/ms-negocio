import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Restaurante from './Restaurante'
import Plato from './Plato'

export default class PlatoRestaurante extends BaseModel {

  public static table = 'plato_restaurante'

  @column({ isPrimary: true })
  public id: number

  @column()
  public precio: number

  @column()
  public restaurante_id: number

  @column()
  public plato_id: number

  @belongsTo(()=> Plato,{
    foreignKey: 'plato_id'
  })
  public plato: BelongsTo<typeof Plato>

  @belongsTo(()=> Restaurante,{
    foreignKey: 'restaurante_id'
  })
  public restaurante: BelongsTo<typeof Restaurante>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
