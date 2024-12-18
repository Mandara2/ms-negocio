import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/vehiculoConductores", "VehiculoConductoresController.find");
    Route.get("/vehiculoConductores/:id", "VehiculoConductoresController.find"); 
    Route.post("/vehiculoConductores", "VehiculoConductoresController.create");
    Route.put("/vehiculoConductores/:id", "VehiculoConductoresController.update");
    Route.delete("/vehiculoConductores/:id", "VehiculoConductoresController.delete");
}).middleware(['security'])