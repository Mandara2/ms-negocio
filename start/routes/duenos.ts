import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/duenos", "DuenosController.find");
    Route.get("/duenos/:id", "DuenosController.find"); 
    Route.post("/duenos", "DuenosController.create");
    Route.put("/duenos/:id", "DuenosController.update");
    Route.delete("/duenos/:id", "DuenosController.delete");
})//.middleware(['security'])