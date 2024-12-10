import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/rutas", "RutasController.find");
    Route.get("/rutas/:id", "RutasController.find"); 
    Route.post("/rutas", "RutasController.create");
    Route.put("/rutas/:id", "RutasController.update");
    Route.delete("/rutas/:id", "RutasController.delete");
})//.middleware(['security'])