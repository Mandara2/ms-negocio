import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductores from 'App/Models/Conductor';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from '@adonisjs/core/build/standalone';
import ConductorValidator from 'App/Validators/ConductorValidator'; // Importar el validador
import { DateTime } from 'luxon';
import Conductor from 'App/Models/Conductor';

export default class ConductoresController {
  // Método de búsqueda
public async find({ request, params }: HttpContextContract) {
  try {
    if (params.id) {
      const theConductor = await Conductor.findOrFail(params.id);

      console.log("1");
      console.log(theConductor);
      
      return {
        ...theConductor.toJSON(),
        fecha_vencimiento_licencia: DateTime.fromJSDate(new Date(theConductor.fecha_vencimiento_licencia)).toFormat('yyyy-MM-dd'),
        fecha_nacimiento: DateTime.fromJSDate(new Date(theConductor.fecha_nacimiento)).toFormat('yyyy-MM-dd'),
      };
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);

        // Obtener datos paginados
        const paginatedConductors = await Conductor.query().paginate(page, perPage);

        // Formatear fechas después de obtener los datos
        const formattedConductors = paginatedConductors.toJSON();
        formattedConductors.data = formattedConductors.data.map(Conductor => ({
          ...Conductor,
          fecha_vencimiento_licencia: DateTime.fromJSDate(new Date(Conductor.fecha_inicio)).toFormat('yyyy-MM-dd'),
          fecha_nacimiento: DateTime.fromJSDate(new Date(Conductor.fecha_fin)).toFormat('yyyy-MM-dd'),
        }));
        console.log("2");
        
        return formattedConductors;
      } else {
        // Consultar todos los Conductors y formatear fechas
        const Conductors = await Conductor.query();
        console.log("3");
        
        return Conductors.map(Conductor => ({
          ...Conductor.toJSON(),
          fecha_vencimiento_licencia: DateTime.fromJSDate(new Date(Conductor.fecha_vencimiento_licencia)).toFormat('yyyy-MM-dd'),
          fecha_nacimiento: DateTime.fromJSDate(new Date(Conductor.fecha_nacimiento)).toFormat('yyyy-MM-dd'),
        }));
      }
    }
  } catch (error) {
    throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
  }
}


  // Método para crear un conductor
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el ConductorValidator
      const body = request.body();
      const payload = await request.validate(ConductorValidator);

      // Llamada al microservicio de usuarios para verificar el ID del usuario
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      // Verificar si no se encontró el usuario
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        return response.notFound({ error: 'No se encontró información de usuario, verifique que el código sea correcto' });
      }

  
      // Convertir fecha_nacimiento a Date
      const fecha_nacimiento_date = payload.fecha_nacimiento.toJSDate();
      const fecha_vencimiento_licencia = payload.fecha_vencimiento_licencia.toJSDate();
      
      const theConductor = await Conductores.create({
        ...payload,
        fecha_nacimiento: fecha_nacimiento_date,
        fecha_vencimiento_licencia: fecha_vencimiento_licencia
      });
      
      return theConductor;

    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un conductor
  public async update({ params, request, response }: HttpContextContract) {
    //SIEMRPE PARA LAS FECHAS
    let payload;

    try {
      // Validar los datos utilizando el ConductorValidator
      payload = await request.validate(ConductorValidator);
      const body = request.body();

      const theConductor = await Conductores.findOrFail(params.id);

      // Llamada al microservicio de usuarios para verificar el ID del usuario
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      // Verificar si no se encontró el usuario
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        return response.notFound({ error: 'No se encontró información de usuario, verifique que el código sea correcto' });
      }

      const fechaNacimientoDate = payload.fecha_nacimiento.toJSDate();
      // Obtener el conductor y actualizar los datos
      theConductor.merge({
        usuario_id: body.usuario_id,
        fecha_nacimiento: fechaNacimientoDate,
        telefono: body.telefono,
        numero_licencia: body.numero_licencia,
        fecha_vencimiento_licencia: body.fecha_vencimiento_licencia
      });

      return await theConductor.save();
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para eliminar un conductor
  public async delete({ params, response }: HttpContextContract) {
    const theConductor = await Conductores.findOrFail(params.id);
    response.status(204);
    return await theConductor.delete();
  }
}
