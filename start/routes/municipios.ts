import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/municipios", "MunicipiosController.find");
    Route.get("/municipios/:id", "MunicipiosController.find"); 
    Route.post("/municipios", "MunicipiosController.create");
    Route.put("/municipios/:id", "MunicipiosController.update");
    Route.delete("/municipios/:id", "MunicipiosController.delete");
})