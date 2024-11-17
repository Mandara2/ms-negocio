import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/categoriasProductos", "CategoriasProductosController.find");
    Route.get("/categoriasProductos/:id", "CategoriasProductosController.find"); 
    Route.post("/categoriasProductos", "CategoriasProductosController.create");
    Route.put("/categoriasProductos/:id", "CategoriasProductosController.update");
    Route.delete("/categoriasProductos/:id", "CategoriasProductosController.delete");
}).middleware(['security'])