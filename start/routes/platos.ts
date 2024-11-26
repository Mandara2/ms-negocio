import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/platos", "PlatosController.find");
    Route.get("/platos/:id", "PlatosController.find"); 
    Route.post("/platos", "PlatosController.create");
    Route.put("/platos/:id", "PlatosController.update");
    Route.delete("/platos/:id", "PlatosController.delete");
})//.middleware(['security'])