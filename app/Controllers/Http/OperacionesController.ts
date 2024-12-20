import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operacion from 'App/Models/Operacion';
import { Exception } from '@adonisjs/core/build/standalone';
import OperacionValidator from 'App/Validators/OperacionValidator'; // Importar el validador
import { DateTime } from 'luxon';

export default class OperacionesController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const theOperacion = await Operacion.findOrFail(params.id);
        await theOperacion.load('municipio');
        await theOperacion.load('vehiculo');

        // Formatear fechas antes de devolver
        return {
          ...theOperacion.toJSON(),
          fecha_inicio: DateTime.fromJSDate(theOperacion.fecha_inicio).toFormat('yyyy-MM-dd'),
          fecha_fin: DateTime.fromJSDate(theOperacion.fecha_fin).toFormat('yyyy-MM-dd'),
        };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);

          // Obtener datos paginados
          const paginatedOperacions = await Operacion.query().paginate(page, perPage);

          // Formatear fechas después de obtener los datos
          const formattedOperacions = paginatedOperacions.toJSON();
          formattedOperacions.data = formattedOperacions.data.map(Operacion => ({
            ...Operacion,
            fecha_inicio: DateTime.fromJSDate(new Date(Operacion.fecha_inicio)).toFormat('yyyy-MM-dd'),
            fecha_fin: DateTime.fromJSDate(new Date(Operacion.fecha_fin)).toFormat('yyyy-MM-dd'),
          }));

          return formattedOperacions;
        } else {
          // Consultar todos los Operacions y formatear fechas
          const Operacions = await Operacion.query();
          return Operacions.map(Operacion => ({
            ...Operacion.toJSON(),
            fecha_inicio: DateTime.fromJSDate(new Date(Operacion.fecha_inicio)).toFormat('yyyy-MM-dd'),
            fecha_fin: DateTime.fromJSDate(new Date(Operacion.fecha_fin)).toFormat('yyyy-MM-dd'),
          }));
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un Operacion
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el OperacionValidator
      
      
      console.log(request.body());

      console.log(request.all());

      
      const payload = await request.validate(OperacionValidator);
      console.log("vamoooooooooooooooos");
      console.log(payload);
      

      // Convertir fecha_nacimiento a Date
      const fecha_inicio = payload.fecha_inicio.toJSDate();
      const fecha_fin = payload.fecha_fin.toJSDate();

      const theOperacion = await Operacion.create({
        ...payload,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin
      });
      console.log(theOperacion);
      
      return theOperacion;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un Operacion
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con OperacionValidator
      payload = await request.validate(OperacionValidator);
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
    // Obtener el Operacion y actualizar los datos
    const theOperacion = await Operacion.findOrFail(params.id);
    theOperacion.fecha_inicio= fecha_inicio;
    theOperacion.fecha_fin = fecha_fin;
    theOperacion.municipio_id= payload.municipio_id;
    theOperacion.vehiculo_id= payload.vehiculo_id;
    return await theOperacion.save();
  }

  // Método para eliminar un Operacion
  public async delete({ params, response }: HttpContextContract) {
    const theOperacion = await Operacion.findOrFail(params.id);
    response.status(204);
    return await theOperacion.delete();
  }
}
