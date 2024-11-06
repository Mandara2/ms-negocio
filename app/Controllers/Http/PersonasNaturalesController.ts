import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonaNatural from 'App/Models/PersonaNatural';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from '@adonisjs/core/build/standalone';
import PersonaNaturalValidator from 'App/Validators/PersonaNaturalValidator'; // Importar el validador

export default class PersonasNaturalesController {
  // Método para encontrar personas naturales
  public async find({ request, params }: HttpContextContract) {
    let thePersonaNatural;

    try {
      if (params.id) {
        // Buscar persona natural por ID
        thePersonaNatural = await PersonaNatural.findOrFail(params.id);
        await thePersonaNatural.load('cliente');

        // Llamada al microservicio de usuarios
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${thePersonaNatural.usuario_id}`, {
          headers: { Authorization: request.headers().authorization || '' }
        });

        // Verificar si se encontró usuario
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception('No se encontró información de usuario en el microservicio', 404);
        }

        // Devolver los datos combinados
        return { cliente: thePersonaNatural, usuario: userResponse.data };
      } else {
        const data = request.all();
        if ('page' in data && 'per_page' in data) {
          const page = request.input('page', 1);
          const perPage = request.input('per_page', 20);
          return await PersonaNatural.query().paginate(page, perPage);
        } else {
          return await PersonaNatural.query();
        }
      }
    } catch (error) {
      // Manejo de errores
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear una persona natural
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar el payload usando el validador
      const payload = await request.validate(PersonaNaturalValidator);
      const body = request.body();

      // Llamada al microservicio de usuarios
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      // Verificar si se encontró usuario
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Error('No se encontró información de usuario, verifique que el código sea correcto');
      }

      // Crear la persona natural
      const thePersonaNatural = await PersonaNatural.create(payload);
      return thePersonaNatural;
    } catch (error) {
      // Manejo de errores de validación o de usuario
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      throw new Exception(error.message || 'Error al procesar la solicitud', 500);
    }
  }

  // Método para actualizar una persona natural
  public async update({ params, request, response }: HttpContextContract) {
    try {
      // Validar el payload usando el validador
      const payload = await request.validate(PersonaNaturalValidator);
      const body = request.body();

      // Buscar la persona natural
      const thePersonaNatural = await PersonaNatural.findOrFail(params.id);

      // Llamada al microservicio de usuarios
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      // Verificar si se encontró usuario
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Error('No se encontró información de usuario, verifique que el código sea correcto');
      }

      // Actualizar los datos
      thePersonaNatural.usuario_id = body.usuario_id;
      thePersonaNatural.identificacion = payload.identificacion;
      thePersonaNatural.tipoDocumento = payload.tipo_documento;
      //thePersonaNatural.fechaNacimiento = payload.fecha_nacimiento;
      thePersonaNatural.cliente_id = body.cliente_id;

      // Guardar los cambios
      return await thePersonaNatural.save();
    } catch (error) {
      // Manejo de errores de validación o de usuario
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      throw new Exception(error.message || 'Error al procesar la solicitud', 500);
    }
  }

  // Método para eliminar una persona natural
  public async delete({ params, response }: HttpContextContract) {
    try {
      const thePersonaNatural = await PersonaNatural.findOrFail(params.id);
      response.status(204);
      return await thePersonaNatural.delete();
    } catch (error) {
      // Manejo de errores al intentar eliminar
      throw new Exception(error.message || 'Error al intentar eliminar la persona natural', 500);
    }
  }
}
