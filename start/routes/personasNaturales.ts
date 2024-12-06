import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/personasNaturales", "PersonasNaturalesController.find");
    Route.get("/personasNaturales/:id", "PersonasNaturalesController.find"); 
    Route.post("/personasNaturales", "PersonasNaturalesController.create");
    Route.put("/personasNaturales/:id", "PersonasNaturalesController.update");
    Route.delete("/personasNaturales/:id", "PersonasNaturalesController.delete");
})//.middleware(['security'])