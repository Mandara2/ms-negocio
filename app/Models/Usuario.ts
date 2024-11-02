import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Conductor from './Conductor'
import Dueno from './Dueno'
import Administrador from './Administrador'
import PersonaNatural from './PersonaNatural'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public email: string
  
  @column()
  public password: string

  @hasOne(() => Cliente, {
    foreignKey: 'usuario_id'
  })
  public cliente: HasOne<typeof Cliente>

  @hasOne(() => Conductor, {
    foreignKey: 'usuario_id'
  })
  public conductor: HasOne<typeof Conductor>

  @hasOne(() => Dueno, {
    foreignKey: 'usuario_id'
  })
  public dueno: HasOne<typeof Dueno>

  @hasOne(() => Administrador, {
    foreignKey: 'usuario_id'
  })
  public administrador: HasOne<typeof Administrador>

  @hasOne(() => PersonaNatural, {
    foreignKey: 'usuario_id'
  })
  public personaNatural: HasOne<typeof PersonaNatural>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
