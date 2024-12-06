import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/turnos", "TurnosController.find");
    Route.get("/turnos/:id", "TurnosController.find"); 
    Route.post("/turnos", "TurnosController.create");
    Route.put("/turnos/:id", "TurnosController.update");
    Route.delete("/turnos/:id", "TurnosController.delete");
})//.middleware(['security'])