import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/facturas", "FacturasController.find");
    Route.get("/facturas/:id", "FacturasController.find"); 
    Route.post("/facturas", "FacturasController.create");
    Route.put("/facturas/:id", "FacturasController.update");
    Route.delete("/facturas/:id", "FacturasController.delete");
}).middleware(['security'])