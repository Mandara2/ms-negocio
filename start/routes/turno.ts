import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/turno", "TurnosController.find");
    Route.get("/turno/:id", "TurnosController.find"); 
    Route.post("/turno", "TurnosController.create");
    Route.put("/turno/:id", "TurnosController.update");
    Route.delete("/turno/:id", "TurnosController.delete");
}).middleware(['security'])