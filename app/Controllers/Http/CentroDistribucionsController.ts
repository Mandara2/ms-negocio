import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CentroDistribucion from 'App/Models/CentroDistribucion';
import { Exception } from '@adonisjs/core/build/standalone';
import CentroDistribucionValidator from 'App/Validators/CentroDistribucionValidator'; // Importar el validador
import Direccion from 'App/Models/Direccion';

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

      if (payload.direccion_id) {
        const existe = await CentroDistribucion.query()
          .where('direccion_id', payload.direccion_id)
          .first();
  
        if (existe) {
          return response.conflict({
            error: 'La dirección ya está asignada a otro centro de distribución',
          });
        }
      }

      // Crear el centro de distribución si la validación es exitosa
      const theCentroDistribucion = await CentroDistribucion.create(payload);

      if(payload.direccion_id) {
      
          let theDireccion:Direccion = await Direccion.findOrFail(payload.direccion_id)
          theCentroDistribucion.direccion_id = theDireccion.id
          theCentroDistribucion.save()
      }
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
    try {
      const payload = await request.validate(CentroDistribucionValidator);

    // Verificar si la dirección ya está asignada a otro centro
    if (payload.direccion_id) {
      const existe = await CentroDistribucion.query()
        .where('direccion_id', payload.direccion_id)
        .andWhereNot('id', params.id) // Excluir el centro actual
        .first();

      if (existe) {
        return response.conflict({
          error: 'La dirección ya está asignada a otro centro de distribución',
        });
      }
    }
      
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
    let payload = await request.validate(CentroDistribucionValidator);
    theCentroDistribucion.nombre = payload.nombre;
    theCentroDistribucion.capacidad_almacenamiento = payload.capacidad_almacenamiento;
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
