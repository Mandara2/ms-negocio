import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/hoteles", "HotelesController.find");
    Route.get("/hoteles/:id", "HotelesController.find"); 
    Route.post("/hoteles", "HotelesController.create");
    Route.put("/hoteles/:id", "HotelesController.update");
    Route.delete("/hoteles/:id", "HotelesController.delete");
})//.middleware(['security'])