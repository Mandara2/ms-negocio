import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turno from 'App/Models/Turno';
import { Exception } from '@adonisjs/core/build/standalone';
import TurnoValidator from 'App/Validators/TurnoValidator'; // Importar el validador

export default class TurnosController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theTurno;
    

    try {
      if (params.id) {
        theTurno = await Turno.findOrFail(params.id);
        await theTurno.load('conductores');
        return theTurno;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Turno.query().paginate(page, perPage);
        } else {
          return await Turno.query();
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
      const theTurno = await Turno.create(payload);
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

    // Obtener el Turno y actualizar los datos
    const theTurno = await Turno.findOrFail(params.id);
    theTurno.fecha_inicio= payload.fecha_inicio;
    theTurno.fecha_fin = payload.fecha_fin;
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
