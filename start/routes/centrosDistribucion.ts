import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/centrosDistribucion", "CentroDistribucionsController.find");
    Route.get("/centrosDistribucion/:id", "CentroDistribucionsController.find"); 
    Route.post("/centrosDistribucion", "CentroDistribucionsController.create");
    Route.put("/centrosDistribucion/:id", "CentroDistribucionsController.update");
    Route.delete("/centrosDistribucion/:id", "CentroDistribucionsController.delete");
}).middleware(['security'])