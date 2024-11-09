import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Direccion from 'App/Models/Direccion';
import { Exception } from '@adonisjs/core/build/standalone';
import DireccionValidator from 'App/Validators/DireccionValidator'; // Importar el validador

export default class DireccionesController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theDireccion;

    try {
      if (params.id) {
        theDireccion = await Direccion.findOrFail(params.id);
        await theDireccion.load("municipio");
        await theDireccion.load('centrosDistribucion');
        return theDireccion;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Direccion.query().paginate(page, perPage);
        } else {
          return await Direccion.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear una dirección
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos usando el DireccionValidator
      const payload = await request.validate(DireccionValidator);

      // Crear la dirección si la validación es exitosa
      const theDireccion = await Direccion.create(payload);
      return theDireccion;

    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar una dirección
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con DireccionValidator
      payload = await request.validate(DireccionValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener la dirección y actualizar los datos
    const theDireccion = await Direccion.findOrFail(params.id);
    theDireccion.localidad = payload.localidad;
    theDireccion.tipo_direccion = payload.tipo_direccion;
    theDireccion.calle = payload.calle;
    theDireccion.numero_direccion = payload.numero_direccion;
    theDireccion.referencias = payload.referencias;
    theDireccion.municipio_id = payload.municipio_id;
    return await theDireccion.save();
  }

  // Método para eliminar una dirección
  public async delete({ params, response }: HttpContextContract) {
    const theDireccion = await Direccion.findOrFail(params.id);
    response.status(204);
    return await theDireccion.delete();
  }
}
