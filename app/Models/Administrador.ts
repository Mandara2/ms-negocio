import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Servicio from "./Servicio";

export default class Administrador extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public usuario_id: string;

  @column()
  public tipo: string;

  @column()
  public telefono: string;

  @hasOne(() => Servicio, {
    foreignKey: "administrador_id",
  })
  public servicio: HasOne<typeof Servicio>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
