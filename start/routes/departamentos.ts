import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/departamentos", "DepartamentosController.find");
  Route.get("/departamentos/:id", "DepartamentosController.find");
  Route.post("/departamentos", "DepartamentosController.create");
  Route.put("/departamentos/:id", "DepartamentosController.update");
  Route.delete("/departamentos/:id", "DepartamentosController.delete");
}).middleware(['security'])
