import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/empresas", "EmpresasController.find");
    Route.get("/empresas/:id", "EmpresasController.find"); 
    Route.post("/empresas", "EmpresasController.create");
    Route.put("/empresas/:id", "EmpresasController.update");
    Route.delete("/empresas/:id", "EmpresasController.delete");
})