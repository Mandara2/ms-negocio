import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
//import Empresa from './Empresa'
import PersonaNatural from "./PersonaNatural";
import Contrato from "./Contrato";
import Producto from "./Producto";

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public usuario_id: string;

  @column()
  public telefono: string;

  @column()
  public cantidad_pedidos_realizados: number;

  /*   @hasOne(() => Empresa, {
    foreignKey: 'cliente_id'
  })
  public empresa: HasOne<typeof Empresa> */

  @hasOne(() => PersonaNatural, {
    foreignKey: "cliente_id",
  })
  public personaNatural: HasOne<typeof PersonaNatural>;

  @hasMany(() => Contrato, {
    foreignKey: "cliente_id",
  })
  public contratos: HasMany<typeof Contrato>;

  @hasMany(() => Producto, {
    foreignKey: "producto_id",
  })
  public productos: HasMany<typeof Producto>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
