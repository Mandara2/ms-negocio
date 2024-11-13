import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Ruta from './Ruta'
import Direccion from './Direccion'
import Lote from './Lote'

export default class DirListaOrden extends BaseModel {

  public static table = 'dir_lista_ordenes'

  @column({ isPrimary: true })
  public id: number

  @column()
  public orden:number

  @column()
  public descripcion:string

  @column()
  public ruta_id:number

  @column()
  public direccion_id:number



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Ruta,{
    foreignKey: 'ruta_id'
  })
  public ruta: BelongsTo<typeof Ruta>

  @belongsTo(()=> Direccion,{
    foreignKey: 'direccion_id'
  })
  public direccion : BelongsTo<typeof Direccion>

  @hasOne(() =>Lote,{
    foreignKey:'dir_lista_orden_id'
  })
  public projector:HasOne<typeof Lote>
}
