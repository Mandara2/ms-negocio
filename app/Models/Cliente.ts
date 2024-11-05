import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
//import Empresa from './Empresa'
import PersonaNatural from './PersonaNatural'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: string

  @column()
  public telefono: string

  @column()
  public cantidadPedidosRealizados: number

/*   @hasOne(() => Empresa, {
    foreignKey: 'cliente_id'
  })
  public empresa: HasOne<typeof Empresa> */

  @hasOne(() => PersonaNatural, {
    foreignKey: 'cliente_id'
  })
  public personaNatural: HasOne<typeof PersonaNatural>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
