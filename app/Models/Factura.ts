import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Gasto from "./Gasto";
import Cuota from "./Cuota";

export default class Factura extends BaseModel {
  public static table = "facturas";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public fecha_hora: Date;

  @column()
  public monto: number;

  @column()
  public estado: string;

  @column()
  public detalles: string;

  @column()
  public cuota_id: number;

  @column()
  public gastos_id: number | null;

  @belongsTo(() => Cuota, {
    foreignKey: "cuota_id",
  })
  public cuota: BelongsTo<typeof Cuota>;

  @belongsTo(() => Gasto, {
    foreignKey: "gasto_id",
  })
  public gasto: BelongsTo<typeof Gasto>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
