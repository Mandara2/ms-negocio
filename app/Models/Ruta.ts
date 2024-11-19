import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'
import VehiculoConductor from './VehiculoConductor'
import DirListaOrden from './DirListaOrden';
//import Lote from './Lote';

export default class Ruta extends BaseModel {

  public static table = 'rutas';

  @column({ isPrimary: true })
  public id: number

  @column()
  public punto_inicio:string

  @column()
  public punto_destino:string

  @column()
  public distancia:number

  @column()
  public fecha_entrega:Date

  @column()
  public contrato_id:number

  @column()
  public vehiculo_conductor_id:number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Contrato,{
    foreignKey: 'contrato_id'
  })
  public contrato: BelongsTo<typeof Contrato>

  @belongsTo(()=> VehiculoConductor,{
    foreignKey: 'vehiculo_conductor_id'
  })
  public vehiculoConductor: BelongsTo<typeof VehiculoConductor>

  @hasMany(() => DirListaOrden, {
    foreignKey: 'ruta_id'
  })
  public dirListaOrden: HasMany<typeof DirListaOrden>

  

  /* @hasMany(() => Lote, {
    foreignKey: 'ruta_id'
  })
  public Lote: HasMany<typeof Lote> */
}
