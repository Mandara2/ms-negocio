import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "productos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("nombre").notNullable();
      table.date("fecha_vencimiento").notNullable();
      table.integer("cliente_id").unsigned().references("clientes.id").notNullable();
      table.integer('lote_id').unsigned().references('lotes.id')
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
