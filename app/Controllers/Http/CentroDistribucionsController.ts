import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CentroDistribucion from 'App/Models/CentroDistribucion';
import { Exception } from '@adonisjs/core/build/standalone';
import CentroDistribucionValidator from 'App/Validators/CentroDistribucionValidator'; // Importar el validador

export default class CentroDistribucionsController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theCentroDistribucion;

    try {
      if (params.id) {
        theCentroDistribucion = await CentroDistribucion.findOrFail(params.id);
        await theCentroDistribucion.load("direcciones");
        return theCentroDistribucion;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await CentroDistribucion.query().paginate(page, perPage);
        } else {
          return await CentroDistribucion.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un centro de distribución
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el CentroDistribucionValidator
      const payload = await request.validate(CentroDistribucionValidator);

      // Crear el centro de distribución si la validación es exitosa
      const theCentroDistribucion = await CentroDistribucion.create(payload);
      return theCentroDistribucion;

    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un centro de distribución
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el CentroDistribucionValidator
      payload = await request.validate(CentroDistribucionValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el centro de distribución y actualizar los datos
    const theCentroDistribucion = await CentroDistribucion.findOrFail(params.id);
    theCentroDistribucion.nombre = payload.nombre;
    theCentroDistribucion.capacidadAlmacenamiento = payload.capacidadAlmacenamiento;
    theCentroDistribucion.direccion_id = payload.direccion_id;
    return await theCentroDistribucion.save();
  }

  // Método para eliminar un centro de distribución
  public async delete({ params, response }: HttpContextContract) {
    const theCentroDistribucion = await CentroDistribucion.findOrFail(params.id);
    response.status(204);
    return await theCentroDistribucion.delete();
  }
}
