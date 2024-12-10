import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/duenoVehiculos", "DuenoVehiculosController.find");
    Route.get("/duenoVehiculos/:id", "DuenoVehiculosController.find"); 
    Route.post("/duenoVehiculos", "DuenoVehiculosController.create");
    Route.put("/duenoVehiculos/:id", "DuenoVehiculosController.update");
    Route.delete("/duenoVehiculos/:id", "DuenoVehiculosController.delete");
})//.middleware(['security'])