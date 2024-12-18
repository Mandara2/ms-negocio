import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonaNatural from 'App/Models/PersonaNatural';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from '@adonisjs/core/build/standalone';
import PersonaNaturalValidator from 'App/Validators/PersonaNaturalValidator'; // Importar el validador
import { DateTime } from 'luxon';

export default class PersonasNaturalesController {
  // Método para encontrar personas naturales
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const thePersonaNatural = await PersonaNatural.findOrFail(params.id);
        await thePersonaNatural.load('empresas');

        // Formatear fechas antes de devolver
        return {
          ...thePersonaNatural.toJSON(),
          fecha_nacimiento: DateTime.fromJSDate(thePersonaNatural.fecha_nacimiento).toFormat('yyyy-MM-dd'),
        };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);

          // Obtener datos paginados
          const paginatedPersonaNaturals = await PersonaNatural.query().paginate(page, perPage);

          // Formatear fechas después de obtener los datos
          const formattedPersonaNaturals = paginatedPersonaNaturals.toJSON();
          formattedPersonaNaturals.data = formattedPersonaNaturals.data.map(PersonaNatural => ({
            ...PersonaNatural,
            fecha_nacimiento: DateTime.fromJSDate(new Date(PersonaNatural.fecha_nacimiento)).toFormat('yyyy-MM-dd'),
          }));

          return formattedPersonaNaturals;
        } else {
          // Consultar todos los PersonaNaturals y formatear fechas
          const PersonaNaturals = await PersonaNatural.query();
          return PersonaNaturals.map(PersonaNatural => ({
            ...PersonaNatural.toJSON(),
            fecha_nacimiento: DateTime.fromJSDate(new Date(PersonaNatural.fecha_nacimiento)).toFormat('yyyy-MM-dd'),
          }));
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear una persona natural
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar el payload usando el validador
      const payload = await request.validate(PersonaNaturalValidator);
      const body = request.body();

      if (payload.cliente_id) {
        const existe = await PersonaNatural.query()
          .where('cliente_id', payload.cliente_id)
          .first();
  
        if (existe) {
          return response.conflict({
            error: 'El cliente ya está asignado a otra persona.',
          });
        }
      }

      // Llamada al microservicio de usuarios
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        return response.notFound({ error: 'No se encontró información de usuario, verifique que el código sea correcto' });
      }

      // Convertir fecha_nacimiento a Date
      const fechaNacimientoDate = payload.fecha_nacimiento.toJSDate();

      // Crear la persona natural
      const thePersonaNatural = await PersonaNatural.create({
        ...payload,
        usuario_id: body.usuario_id,
        fecha_nacimiento: fechaNacimientoDate
      });
      
      return thePersonaNatural;
    } catch (error) {
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

      if (payload.cliente_id) {
            const existe = await PersonaNatural.query()
              .where('cliente_id', payload.cliente_id)
              .andWhereNot('id', params.id) // Excluir el centro actual
              .first();
      
            if (existe) {
              return response.conflict({
                error: 'El cliente ya está asignado a otra persona',
              });
            }
          }
      // Buscar la persona natural
      const thePersonaNatural = await PersonaNatural.findOrFail(params.id);

      // Llamada al microservicio de usuarios
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        return response.notFound({ error: 'No se encontró información de usuario, verifique que el código sea correcto' });
      }

      // Convertir fecha_nacimiento a Date
      const fechaNacimientoDate = payload.fecha_nacimiento.toJSDate();

      // Actualizar los datos
      thePersonaNatural.merge({
        usuario_id: body.usuario_id,
        identificacion: payload.identificacion,
        tipo_documento: payload.tipo_documento,
        fecha_nacimiento: fechaNacimientoDate,
        cliente_id: body.cliente_id,
      });

      return await thePersonaNatural.save();
    } catch (error) {
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
      throw new Exception(error.message || 'Error al intentar eliminar la persona natural', 500);
    }
  }
}
