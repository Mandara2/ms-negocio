import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  BelongsTo,
  belongsTo,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import DirListaOrden from "./DirListaOrden";
import Producto from "./Producto";
//import Ruta from './Ruta';

export default class Lote extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public peso: number;

  @column()
  public volumen: number;

  @column()
  public dir_lista_orden_id: number;

  /* @column()
  public ruta_id: number */

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => DirListaOrden, {
    foreignKey: "dir_lista_orden_id",
  })
  public dirListaOrden: BelongsTo<typeof DirListaOrden>;

  @hasMany(() => Producto, {
    foreignKey: "lote_id",
  })
  public productos: HasMany<typeof Producto>;
  /* @belongsTo(() =>Ruta ,{
    foreignKey:'ruta_id'
  })
  public Ruta:BelongsTo<typeof Ruta> */
}
