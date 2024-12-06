import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/lotes", "LotesController.find");
    Route.get("/lotes/:id", "LotesController.find"); 
    Route.post("/lotes", "LotesController.create");
    Route.put("/lotes/:id", "LotesController.update");
    Route.delete("/lotes/:id", "LotesController.delete");
})//.middleware(['security'])