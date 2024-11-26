import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/platoRestaurantes", "PlatoRestaurantesController.find");
    Route.get("/platoRestaurantes/:id", "PlatoRestaurantesController.find"); 
    Route.post("/platoRestaurantes", "PlatoRestaurantesController.create");
    Route.put("/platoRestaurantes/:id", "PlatoRestaurantesController.update");
    Route.delete("/platoRestaurantes/:id", "PlatoRestaurantesController.delete");
})//.middleware(['security'])