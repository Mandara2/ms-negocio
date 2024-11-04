import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Clientes from 'App/Models/Cliente';

export default class ClientesController { //se encarga de hacer las operaciones de CRUD

    public async find({ request, params }: HttpContextContract) {
        let theCliente;
    
        if (params.id) {
          theCliente = await Clientes.findOrFail(params.id)
          //await theCliente.load("personaNatural")
          //await theCliente.load("empresa")
    
          // Combinar la respuesta con los datos del cliente
          return { cliente: theCliente}
        } else {
          const data = request.all()
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1)
            const perPage = request.input("per_page", 20)
            return await Clientes.query().paginate(page, perPage)
          } else {
            return await Clientes.query()
          }
        }
      }
    
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCliente: Clientes = await Clientes.create(body);
        return theCliente;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCliente: Clientes = await Clientes.findOrFail(params.id);
        const body = request.body();
        theCliente.telefono = body.telefono;
        theCliente.cantidadPedidosRealizados = body.cantidadPedidosRealizados
        return await theCliente.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCliente: Clientes = await Clientes.findOrFail(params.id);
            response.status(204);
            return await theCliente.delete();
    }
}

