import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Empresa from './Empresa'
import PersonaNatural from './PersonaNatural'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public telefono: string

  @column()
  public usuario_id: string

  @hasOne(() => Empresa, {
    foreignKey: 'cliente_id'
  })
  public empresa: HasOne<typeof Empresa>

  @hasOne(() => PersonaNatural, {
    foreignKey: 'cliente_id'
  })
  public personaNatural: HasOne<typeof PersonaNatural>

  @belongsTo(() => Usuario, {
    foreignKey: 'usuario_id'
  })
  public usuario: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
