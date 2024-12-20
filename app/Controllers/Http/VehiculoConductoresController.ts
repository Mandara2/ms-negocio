import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehiculoConductor from 'App/Models/VehiculoConductor';
import { Exception } from '@adonisjs/core/build/standalone';
import VehiculoConductorValidator from 'App/Validators/VehiculoConductorValidator'; // Importar el validador
import { DateTime } from 'luxon';

export default class VehiculoConductoresController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const theVehiculoConductor = await VehiculoConductor.findOrFail(params.id);
        await theVehiculoConductor.load('conductor');
        await theVehiculoConductor.load('vehiculo')

        // Formatear fechas antes de devolver
        return {
          ...theVehiculoConductor.toJSON(),
          fecha_inicio: DateTime.fromJSDate(theVehiculoConductor.fecha_inicio).toFormat('yyyy-MM-dd'),
          fecha_fin: DateTime.fromJSDate(theVehiculoConductor.fecha_fin).toFormat('yyyy-MM-dd'),
        };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);

          // Obtener datos paginados
          const paginatedVehiculoConductors = await VehiculoConductor.query().paginate(page, perPage);

          // Formatear fechas después de obtener los datos
          const formattedVehiculoConductors = paginatedVehiculoConductors.toJSON();
          formattedVehiculoConductors.data = formattedVehiculoConductors.data.map(VehiculoConductor => ({
            ...VehiculoConductor,
            fecha_inicio: DateTime.fromJSDate(new Date(VehiculoConductor.fecha_inicio)).toFormat('yyyy-MM-dd'),
            fecha_fin: DateTime.fromJSDate(new Date(VehiculoConductor.fecha_fin)).toFormat('yyyy-MM-dd'),
          }));

          return formattedVehiculoConductors;
        } else {
          // Consultar todos los VehiculoConductors y formatear fechas
          const VehiculoConductors = await VehiculoConductor.query();
          return VehiculoConductors.map(VehiculoConductor => ({
            ...VehiculoConductor.toJSON(),
            fecha_inicio: DateTime.fromJSDate(new Date(VehiculoConductor.fecha_inicio)).toFormat('yyyy-MM-dd'),
            fecha_fin: DateTime.fromJSDate(new Date(VehiculoConductor.fecha_fin)).toFormat('yyyy-MM-dd'),
          }));
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un VehiculoConductor
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el VehiculoConductorValidator
      const payload = await request.validate(VehiculoConductorValidator);

      // Convertir fecha_nacimiento a Date
      const fecha_inicio = payload.fecha_inicio.toJSDate();
      const fecha_fin = payload.fecha_fin.toJSDate();

      const theVehiculoConductor = await VehiculoConductor.create({
        ...payload,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin
      });
      return theVehiculoConductor;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un VehiculoConductor
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con VehiculoConductorValidator
      payload = await request.validate(VehiculoConductorValidator);
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

    // Obtener el VehiculoConductor y actualizar los datos
    const theVehiculoConductor = await VehiculoConductor.findOrFail(params.id);
    theVehiculoConductor.fecha_inicio= fecha_inicio;
    theVehiculoConductor.fecha_fin= fecha_fin;
    theVehiculoConductor.conductor_id= payload.conductor_id;
    theVehiculoConductor.vehiculo_id= payload.vehiculo_id;
    return await theVehiculoConductor.save();
  }

  // Método para eliminar un VehiculoConductor
  public async delete({ params, response }: HttpContextContract) {
    const theVehiculoConductor = await VehiculoConductor.findOrFail(params.id);
    response.status(204);
    return await theVehiculoConductor.delete();
  }
}
