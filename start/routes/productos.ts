import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/productos", "PoductosController.find");
    Route.get("/productos/:id", "PoductosController.find"); 
    Route.post("/productos", "ProductosController.create");
    Route.put("/productos/:id", "PoductosController.update");
    Route.delete("/productos/:id", "PoductosController.delete");
}).middleware(['security'])