import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehiculoConductor from 'App/Models/VehiculoConductor';
import { Exception } from '@adonisjs/core/build/standalone';
import VehiculoConductorValidator from 'App/Validators/VehiculoConductorValidator'; // Importar el validador

export default class VehiculoConductoresController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theVehiculoConductor;
    

    try {
      if (params.id) {
        // CARGAR LO QUE SE
        theVehiculoConductor = await VehiculoConductor.findOrFail(params.id);
        await theVehiculoConductor.load('vehiculo');
        await theVehiculoConductor.load('conductor');
        return theVehiculoConductor;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await VehiculoConductor.query().paginate(page, perPage);
        } else {
          return await VehiculoConductor.query();
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
