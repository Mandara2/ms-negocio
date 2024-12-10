import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/direcciones", "DireccionesController.find");
    Route.get("/direcciones/:id", "DireccionesController.find"); 
    Route.post("/direcciones", "DireccionesController.create");
    Route.put("/direcciones/:id", "DireccionesController.update");
    Route.delete("/direcciones/:id", "DireccionesController.delete");
})//.middleware(['security'])