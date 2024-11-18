import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/categoriasProductos", "CategoriaProductosController.find");
    Route.get("/categoriasProductos/:id", "CategoriaProductosController.find"); 
    Route.post("/categoriasProductos", "CategoriaProductosController.create");
    Route.put("/categoriasProductos/:id", "CategoriaProductosController.update");
    Route.delete("/categoriasProductos/:id", "CategoriaProductosController.delete");
}).middleware(['security'])