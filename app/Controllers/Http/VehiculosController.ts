import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehiculo from 'App/Models/Vehiculo';
import { Exception } from '@adonisjs/core/build/standalone';
import VehiculoValidator from 'App/Validators/VehiculoValidator'; // Importar el validador

export default class VehiculoController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theVehiculo;
    

    try {
      if (params.id) {
        theVehiculo = await Vehiculo.findOrFail(params.id);
        return theVehiculo;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Vehiculo.query().paginate(page, perPage);
        } else {
          return await Vehiculo.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un Vehiculo
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el VehiculoValidator
      const payload = await request.validate(VehiculoValidator);

      // Crear el Vehiculo si la validación es exitosa
      const theVehiculo = await Vehiculo.create(payload);
      return theVehiculo;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un Vehiculo
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con VehiculoValidator
      payload = await request.validate(VehiculoValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el Vehiculo y actualizar los datos
    const theVehiculo = await Vehiculo.findOrFail(params.id);
    theVehiculo.matricula= payload.matricula;
    theVehiculo.modelo = payload.modelo;
    theVehiculo.capacidad_carga= payload.capacidad_carga;
    theVehiculo.tipo_carga= payload.tipo_carga;
    return await theVehiculo.save();
  }

  // Método para eliminar un Vehiculo
  public async delete({ params, response }: HttpContextContract) {
    const theVehiculo = await Vehiculo.findOrFail(params.id);
    response.status(204);
    return await theVehiculo.delete();
  }
}
