import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehiculos", "VehiculosController.find");
    Route.get("/vehiculos/:id", "VehiculosController.find"); 
    Route.post("/vehiculos", "VehiculosController.create");
    Route.put("/vehiculos/:id", "VehiculosController.update");
    Route.delete("/vehiculos/:id", "VehiculosController.delete");
}).middleware(['security'])