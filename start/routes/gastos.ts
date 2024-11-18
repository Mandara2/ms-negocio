import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/gastos", "GastosController.find");
    Route.get("/gastos/:id", "GastosController.find"); 
    Route.post("/gastos", "GastosController.create");
    Route.put("/gastos/:id", "GastosController.update");
    Route.delete("/gastos/:id", "GastosController.delete");
}).middleware(['security'])