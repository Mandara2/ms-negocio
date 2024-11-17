import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Administrador from "./Administrador";
import Restaurante from "./Restaurante";
import Hotel from "./Hotel";

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public fecha: Date;

  @column()
  public descripcion: string;

  @column()
  public administrador_id: number;

  @belongsTo(() => Administrador, {
    foreignKey: "administrador_id",
  })
  public administrador: BelongsTo<typeof Administrador>;

  @hasOne(() => Restaurante, {
    foreignKey: "servicio_id",
  })
  public restaurante: HasOne<typeof Restaurante>;

  @hasOne(() => Hotel, {
    foreignKey: "servicio_id",
  })
  public hotel: HasOne<typeof Hotel>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
