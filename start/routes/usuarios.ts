import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/usuarios", "UsuariosController.find");
    Route.get("/usuarios/:id", "UsuariosController.find"); 
    Route.post("/usuarios", "UsuariosController.create");
    Route.put("/usuarios/:id", "UsuariosController.update");
    Route.delete("/usuarios/:id", "UsuariosController.delete");
})