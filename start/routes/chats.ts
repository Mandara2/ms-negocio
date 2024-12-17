import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/chats/buscar-usuario", "ChatsController.buscarUsuario");
    Route.post("/chats/enviar-mensaje", "ChatsController.enviarMensaje");
    Route.get('/chats/obtener-mensajes', 'ChatsController.obtenerMensajes');
    Route.get('/chats/obtener-telefono/:id', 'ChatsController.obtenerTelefono');
})//.middleware(['security'])