import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operacion from 'App/Models/Operacion';
import { Exception } from '@adonisjs/core/build/standalone';
import OperacionValidator from 'App/Validators/OperacionValidator'; // Importar el validador

export default class OperacionesController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theOperacion;
    

    try {
      if (params.id) {
        theOperacion = await Operacion.findOrFail(params.id);
        await theOperacion.load('municipios');
        await theOperacion.load('vehiculo');
        return theOperacion;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Operacion.query().paginate(page, perPage);
        } else {
          return await Operacion.query();
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
      const payload = await request.validate(OperacionValidator);

      // Convertir fecha_nacimiento a Date
      const fecha_inicio = payload.fecha_inicio.toJSDate();
      const fecha_fin = payload.fecha_fin.toJSDate();

      const theOperacion = await Operacion.create({
        ...payload,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin
      });
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
