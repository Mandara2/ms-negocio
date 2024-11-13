import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/conductores", "ConductoresController.find");
    Route.get("/conductores/:id", "ConductoresController.find"); 
    Route.post("/conductores", "ConductoresController.create");
    Route.put("/conductores/:id", "ConductoresController.update");
    Route.delete("/conductores/:id", "ConductoresController.delete");
}).middleware(['security'])