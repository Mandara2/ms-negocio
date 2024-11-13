import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seguro from 'App/Models/Seguro';
import { Exception } from '@adonisjs/core/build/standalone';
import SeguroValidator from 'App/Validators/SeguroValidator'; // Importar el validador

export default class SegurosController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theSeguro;
    

    try {
      if (params.id) {
        theSeguro = await Seguro.findOrFail(params.id);
        await theSeguro.load('vehiculo');
        return theSeguro;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Seguro.query().paginate(page, perPage);
        } else {
          return await Seguro.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un Seguro
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el SeguroValidator
      const payload = await request.validate(SeguroValidator);

      // Convertir fecha_nacimiento a Date
      const fecha_inicio = payload.fecha_inicio.toJSDate();
      const fecha_fin = payload.fecha_fin.toJSDate();

      const theSeguro = await Seguro.create({
        ...payload,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin
      });
      return theSeguro;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un Seguro
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con SeguroValidator
      payload = await request.validate(SeguroValidator);
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
    // Obtener el Seguro y actualizar los datos
    const theSeguro = await Seguro.findOrFail(params.id);
    theSeguro.fecha_inicio= fecha_inicio;
    theSeguro.fecha_fin = fecha_fin;
    theSeguro.compania_aseguradora= payload.compania_aseguradora;
    theSeguro.vehiculo_id= payload.vehiculo_id;
    return await theSeguro.save();
  }

  // Método para eliminar un Seguro
  public async delete({ params, response }: HttpContextContract) {
    const theSeguro = await Seguro.findOrFail(params.id);
    response.status(204);
    return await theSeguro.delete();
  }
}
