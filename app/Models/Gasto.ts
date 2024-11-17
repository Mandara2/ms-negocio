import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Dueno from "./Dueno";
import Conductor from "./Conductor";
import Servicio from "./Servicio";
import Factura from "./Factura";

export default class Gasto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public detalles: string;

  @column()
  public dueno_id: number;

  @column()
  public conductor_id: number;

  @column()
  public servicio_id: number;

  @belongsTo(() => Dueno, {
    foreignKey: "dueno_id",
  })
  public dueno: BelongsTo<typeof Dueno>;

  @belongsTo(() => Conductor, {
    foreignKey: "conductor_id",
  })
  public conductor: BelongsTo<typeof Conductor>;

  @belongsTo(() => Servicio, {
    foreignKey: "servicio_id",
  })
  public servicio: BelongsTo<typeof Servicio>;

  @hasOne(() => Factura, {
    foreignKey: "gasto_id",
  })
  public factura: HasOne<typeof Factura>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
