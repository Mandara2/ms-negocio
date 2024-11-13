import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Clientes from 'App/Models/Cliente';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from '@adonisjs/core/build/standalone';
import ClienteValidator from 'App/Validators/ClienteValidator'; // Importar el validador

export default class ClientesController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theCliente;

    try {
      if (params.id) {
        theCliente = await Clientes.findOrFail(params.id);

        // Llamada al microservicio de usuarios
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${theCliente.usuario_id}`, {
          headers: { Authorization: request.headers().authorization || '' }
        });

        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception('No se encontró información de usuario en el microservicio', 404);
        }

        return { cliente: theCliente, usuario: userResponse.data };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Clientes.query().paginate(page, perPage);
        } else {
          return await Clientes.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un cliente
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el ClienteValidator
      const payload = await request.validate(ClienteValidator);
      const body = request.body();

      // Llamada al microservicio de usuarios
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      // Verificar si no se encontró información del usuario en el microservicio
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        return response.notFound({ error: 'No se encontró información de usuario, verifique que el código sea correcto' });
      }

      // Crear el cliente si la validación y la verificación de usuario son exitosas
      const theCliente = await Clientes.create(payload);
      return theCliente;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un cliente
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con ClienteValidator
      payload = await request.validate(ClienteValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el cliente y preparar la respuesta del usuario
    const theCliente = await Clientes.findOrFail(params.id);
    const body = request.body();

    // Verificar la existencia del usuario en el microservicio
    const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
      headers: { Authorization: request.headers().authorization || '' }
    });

    if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
      return response.notFound({ error: 'No se encontró información de usuario, verifique que el código sea correcto' });
    }

    // Actualizar los datos del cliente con los datos validados
    theCliente.merge(payload);
    return await theCliente.save();
  }

  // Método para eliminar un cliente
  public async delete({ params, response }: HttpContextContract) {
    const theCliente = await Clientes.findOrFail(params.id);
    response.status(204);
    return await theCliente.delete();
  }
}
