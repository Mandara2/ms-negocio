import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrador from 'App/Models/Administrador';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from '@adonisjs/core/build/standalone';
import AdministradorValidator from 'App/Validators/AdministradorValidator'; // Importar el validador

export default class AdministradoresController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theAdministrador;

    try {
      if (params.id) {
        theAdministrador = await Administrador.findOrFail(params.id);

        // Llamada al microservicio de usuarios
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${theAdministrador.usuario_id}`, {
          headers: { Authorization: request.headers().authorization || '' }
        });

        // Verificar si userResponse.data es null o está vacío
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception('No se encontró información de usuario en el microservicio', 404);
        }

        // Combinar la respuesta con los datos del administrador
        return { administrador: theAdministrador, usuario: userResponse.data };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Administrador.query().paginate(page, perPage);
        } else {
          return await Administrador.query();
        }
      }
    } catch (error) {
      // Si hay un error, lanzar una excepción con un mensaje y código de estado
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un administrador
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el AdministradorValidator
      const payload = await request.validate(AdministradorValidator);
      const body = request.body()

      // Llamada al microservicio de usuarios para verificar el ID del usuario
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      // Verificar si no se encontró el usuario
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Exception('No se encontró información de usuario, verifique que el código sea correcto', 404);
      }

      // Crear el administrador si la validación es exitosa
      const theAdministrador = await Administrador.create(payload);
      return theAdministrador;

    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un administrador
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el AdministradorValidator
      payload = await request.validate(AdministradorValidator);
      const body = request.body();

      // Llamada al microservicio de usuarios para verificar el ID del usuario
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      // Verificar si no se encontró el usuario
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Exception('No se encontró información de usuario, verifique que el código sea correcto', 404);
      }

      // Obtener el administrador y actualizar los datos
      const theAdministrador = await Administrador.findOrFail(params.id);
      theAdministrador.usuario_id = payload.usuario_id;
      theAdministrador.tipo = payload.tipo;
      theAdministrador.telefono = payload.telefono;
      return await theAdministrador.save();
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para eliminar un administrador
  public async delete({ params, response }: HttpContextContract) {
    const theAdministrador = await Administrador.findOrFail(params.id);
    response.status(204);
    return await theAdministrador.delete();
  }
}
