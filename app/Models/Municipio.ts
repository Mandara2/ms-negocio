import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento'
import Direccion from './Direccion'


export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public codigoPostal: string

  @column()
  public departamento_id: string

  @hasMany(() => Direccion, {
    foreignKey: 'municipio_id'
  })
  public direcciones: HasMany<typeof Direccion>

  @belongsTo(() => Departamento, {
    foreignKey: 'departamento_id'
  })
  public departamento: BelongsTo<typeof Departamento>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
