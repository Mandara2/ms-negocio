import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "hoteles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("estrellas");
      table.string("nombre").notNullable();
      table.string('ubicacion')
      table.integer('servicio_id').unsigned().references('servicios.id')
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
