import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/administrador", "AdministradoresController.find");
    Route.get("/administrador/:id", "AdministradoresController.find"); 
    Route.post("/administrador", "AdministradoresController.create");
    Route.put("/administrador/:id", "AdministradoresController.update");
    Route.delete("/administrador/:id", "AdministradoresController.delete");
}).middleware(['security'])