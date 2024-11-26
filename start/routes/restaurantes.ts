import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/restaurantes", "RestaurantesController.find");
    Route.get("/restaurantes/:id", "RestaurantesController.find"); 
    Route.post("/restaurantes", "RestaurantesController.create");
    Route.put("/restaurantes/:id", "RestaurantesController.update");
    Route.delete("/restaurantes/:id", "RestaurantesController.delete");
})//.middleware(['security'])