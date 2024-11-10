import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Conductor from './Conductor';
import Ruta from './Ruta';

export default class VehiculoConductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_inicio:Date

  @column()
  public fecha_fin:Date

  @column()
  public vehiculo_id:number

  @column()
  public conductor_id:number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Vehiculo,{
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>

  @belongsTo(()=> Conductor,{
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>

  @hasMany(() => Ruta,{
    foreignKey:'vehiculo_conductor_id'
  })
  public rutas:HasMany<typeof Ruta>
}
