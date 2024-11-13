import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/operaciones", "OperacionesController.find");
    Route.get("/operaciones/:id", "OperacionesController.find"); 
    Route.post("/operaciones", "OperacionesController.create");
    Route.put("/operaciones/:id", "OperacionesController.update");
    Route.delete("/operaciones/:id", "OperacionesController.delete");
}).middleware(['security'])