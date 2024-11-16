import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "facturas";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.string("fecha_hora");
      table.integer("monto").notNullable()
      table.integer('cuota_id').unsigned().references('cuotas.id');
      table.integer('gastos_id').unsigned().references('gastos.id');
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
