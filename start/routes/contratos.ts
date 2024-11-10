import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/contrato", "ContratosController.find");
    Route.get("/contrato/:id", "ContratosController.find"); 
    Route.post("/contrato", "ContratosController.create");
    Route.put("/contrato/:id", "ContratosController.update");
    Route.delete("/contrato/:id", "ContratosController.delete");
}).middleware(['security'])