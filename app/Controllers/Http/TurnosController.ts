import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turno from 'App/Models/Turno';
import { Exception } from '@adonisjs/core/build/standalone';
import TurnoValidator from 'App/Validators/TurnoValidator'; // Importar el validador
import { DateTime } from 'luxon';

export default class TurnosController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const theTurno = await Turno.findOrFail(params.id);
        await theTurno.load('conductor');

        // Formatear fechas antes de devolver
        return {
          ...theTurno.toJSON(),
          fecha_inicio: DateTime.fromJSDate(new Date(theTurno.fecha_inicio)).toFormat('yyyy-MM-dd'),
            fecha_fin: DateTime.fromJSDate(new Date(theTurno.fecha_fin)).toFormat('yyyy-MM-dd'),
        };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);

          // Obtener datos paginados
          const paginatedTurnos = await Turno.query().paginate(page, perPage);

          // Formatear fechas después de obtener los datos
          const formattedTurnos = paginatedTurnos.toJSON();
          formattedTurnos.data = formattedTurnos.data.map(turno => ({
            ...turno,
            fecha_inicio: DateTime.fromJSDate(new Date(turno.fecha_inicio)).toFormat('yyyy-MM-dd'),
            fecha_fin: DateTime.fromJSDate(new Date(turno.fecha_fin)).toFormat('yyyy-MM-dd'),
          }));
          
          return formattedTurnos;
        } else {
          // Consultar todos los turnos y formatear fechas
          const turnos = await Turno.query();
          
          return turnos.map(turno => ({
            ...turno.toJSON(),
            fecha_inicio: DateTime.fromJSDate(new Date(turno.fecha_inicio)).toFormat('yyyy-MM-dd'),
            fecha_fin: DateTime.fromJSDate(new Date(turno.fecha_fin)).toFormat('yyyy-MM-dd'),
          }));
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un Turno
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el TurnoValidator
      const payload = await request.validate(TurnoValidator);



      const fecha_inicio = payload.fecha_inicio.toJSDate();
      const fecha_fin = payload.fecha_fin.toJSDate();

      const theTurno = await Turno.create({
        ...payload,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin
      });
      return theTurno;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un Turno
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con TurnoValidator
      payload = await request.validate(TurnoValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    const fecha_inicio = payload.fecha_inicio.toJSDate();
      const fecha_fin = payload.fecha_fin.toJSDate();

    // Obtener el Turno y actualizar los datos
    const theTurno = await Turno.findOrFail(params.id);
    theTurno.fecha_inicio= fecha_inicio;
    theTurno.fecha_fin = fecha_fin;
    theTurno.conductor_id= payload.conductor_id;
    

    return await theTurno.save();
  }

  // Método para eliminar un Turno
  public async delete({ params, response }: HttpContextContract) {
    const theTurno = await Turno.findOrFail(params.id);
    response.status(204);
    return await theTurno.delete();
  }
}
