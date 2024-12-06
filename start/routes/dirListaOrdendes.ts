import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/dirListaOrdenes", "DirListaOrdenesController.find");
    Route.get("/dirListaOrdenes/:id", "DirListaOrdenesController.find"); 
    Route.post("/dirListaOrdenes", "DirListaOrdenesController.create");
    Route.put("/dirListaOrdenes/:id", "DirListaOrdenesController.update");
    Route.delete("/dirListaOrdenes/:id", "DirListaOrdenesController.delete");
})//.middleware(['security'])