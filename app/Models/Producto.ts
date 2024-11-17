import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Cliente from "./Cliente";
import CategoriaProducto from "./CategoriaProducto";
import Lote from "./Lote";

export default class Producto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public fecha_vencimiento: Date;

  @column()
  public cliente_id: number;

  @column()
  public lote_id: number;

  @belongsTo(() => Cliente, {
    foreignKey: "cliente_id",
  })

  public cliente: BelongsTo<typeof Cliente>;

  @belongsTo(() => Lote, {
    foreignKey: "lote_id",
  })
  public Lote: BelongsTo<typeof Lote>;

  @hasMany(() => CategoriaProducto, {
    foreignKey: "producto_id",
  })
  public CategoriaProducto: HasMany<typeof CategoriaProducto>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
