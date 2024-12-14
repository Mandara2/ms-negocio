import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/facturas", "FacturasController.find");
  Route.get("/facturas/:id", "FacturasController.find");
  Route.get("/facturas/check/:id", "FacturasController.checkFacturaExists");
  Route.post("/facturas", "FacturasController.create");
  Route.put("/facturas/:id", "FacturasController.update");
  Route.delete("/facturas/:id", "FacturasController.delete");

  // Nueva ruta para actualizar el estado de la factura a 'PAGADO'
  Route.post("/facturas/:id/actualizar", "FacturasController.actualizarEstado");
});
