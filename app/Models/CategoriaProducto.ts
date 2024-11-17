import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Producto from "./Producto";
import Categoria from "./Categoria";

export default class CategoriaProducto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public producto_id: number;

  @column()
  public categoria_id: number;

  @column()
  public detalle: string;

  @belongsTo(() => Producto, {
    foreignKey: "producto_id",
  })
  public producto: BelongsTo<typeof Producto>;

  @belongsTo(() => Categoria, {
    foreignKey: "categoria_id",
  })
  public categoria: BelongsTo<typeof Categoria>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
