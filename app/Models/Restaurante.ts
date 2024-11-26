import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Servicio from "./Servicio";
import PlatoRestaurante from "./PlatoRestaurante";

export default class Restaurante extends BaseModel {

  public static table = 'restaurantes';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public ubicacion: string;

  @column()
  public servicio_id: number;

  @belongsTo(() => Servicio, {
    foreignKey: "servicio_id",
  })
  public servicio: BelongsTo<typeof Servicio>;

  @hasMany(() => PlatoRestaurante, {
    foreignKey: 'restaurante_id'
  })
  public platoRestaurante: HasMany<typeof PlatoRestaurante>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
