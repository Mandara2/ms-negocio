import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DuenoVehiculo from 'App/Models/DuenoVehiculo';
import { Exception } from '@adonisjs/core/build/standalone';
import DuenoVehiculoValidator from 'App/Validators/DuenoVehiculoValidator'; // Importar el validador

export default class DuenoVehiculoController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theDuenoVehiculo;
    

    try {
      if (params.id) {
        theDuenoVehiculo = await DuenoVehiculo.findOrFail(params.id);
        await theDuenoVehiculo.load('duenos');
        await theDuenoVehiculo.load('vehiculos');
        return theDuenoVehiculo;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await DuenoVehiculo.query().paginate(page, perPage);
        } else {
          return await DuenoVehiculo.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un DuenoVehiculo
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el DuenoVehiculoValidator
      const payload = await request.validate(DuenoVehiculoValidator);

      // Crear el DuenoVehiculo si la validación es exitosa
      const theDuenoVehiculo = await DuenoVehiculo.create(payload);
      return theDuenoVehiculo;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un DuenoVehiculo
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con DuenoVehiculoValidator
      payload = await request.validate(DuenoVehiculoValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el DuenoVehiculo y actualizar los datos
    const theDuenoVehiculo = await DuenoVehiculo.findOrFail(params.id);
    theDuenoVehiculo.fecha_adquisicion= payload.fecha_adquisicion;
    theDuenoVehiculo.porcentaje_propiedad = payload.porcentaje_propiedad;
    theDuenoVehiculo.dueno_id= payload.dueno_id;
    theDuenoVehiculo.vehiculo_id= payload.vehiculo_id;
    return await theDuenoVehiculo.save();
  }

  // Método para eliminar un DuenoVehiculo
  public async delete({ params, response }: HttpContextContract) {
    const theDuenoVehiculo = await DuenoVehiculo.findOrFail(params.id);
    response.status(204);
    return await theDuenoVehiculo.delete();
  }
}
