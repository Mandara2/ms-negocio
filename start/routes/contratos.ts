import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/contratos", "ContratosController.find");
    Route.get("/contratos/:id", "ContratosController.find"); 
    Route.post("/contratos", "ContratosController.create");
    Route.put("/contratos/:id", "ContratosController.update");
    Route.delete("/contratos/:id", "ContratosController.delete");
    Route.patch("/contratos/:id","ContratosController.updateCoordinates")
}).middleware(['security'])