import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Seguro from './Seguro'
import Operacion from './Operacion'
import DuenoVehiculo from './DuenoVehiculo'
import VehiculoConductor from './VehiculoConductor';

export default class Vehiculo extends BaseModel {

  public static table = 'vehiculos'

  @column({ isPrimary: true })
  public id: number

  @column()
  public matricula:string

  @column()
  public modelo:string

  @column()
  public capacidad_carga:number

  @column()
  public tipo_carga:string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Seguro,{
    foreignKey:'vehiculo_id'
  })
  public seguros:HasMany<typeof Seguro>

  @hasMany(() => Operacion, {
    foreignKey: 'vehiculo_id'
  })
  public operaciones: HasMany<typeof Operacion>

  @hasMany(() => DuenoVehiculo, {
    foreignKey: 'vehiculo_id'
  })
  public duenosVehiculos: HasMany<typeof DuenoVehiculo>

  @hasMany(() => VehiculoConductor, {
    foreignKey: 'vehiculo_id'
  })
  public VehiculosConductores: HasMany<typeof VehiculoConductor>
}
