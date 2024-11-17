import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Empresa from './Empresa'

export default class PersonaNatural extends BaseModel {

  public static table = 'personas_naturales'

  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: string

  @column()
  public identificacion: string

  @column()
  public tipo_documento: string

  @column()
  public fecha_nacimiento: Date

  @column()
  public empresa_id: number

  @column()
  public cliente_id: number

  @hasMany(() => Empresa, {
    foreignKey: 'persona_natural_id'
  })
  public empresa: HasMany<typeof Empresa>  

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
