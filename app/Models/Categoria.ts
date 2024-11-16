import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public descripcion: string;

  @column()
  public categoria_padre: string | null;

  @hasOne(() => Categoria, {
    foreignKey: "categoria_padre",
  })
  public subcategoria: HasOne<typeof Categoria>;

  // Relación "pertenece a"
  @belongsTo(() => Categoria, {
    foreignKey: "categoria_padre",
  })
  public categoriaPadre: BelongsTo<typeof Categoria>;

  @column()
  public detalle: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
