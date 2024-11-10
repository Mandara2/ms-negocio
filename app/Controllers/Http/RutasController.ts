import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruta from 'App/Models/Ruta';
import { Exception } from '@adonisjs/core/build/standalone';
import RutaValidator from 'App/Validators/RutaValidator'; // Importar el validador

export default class RutasController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theRuta;
    

    try {
      if (params.id) {
        theRuta = await Ruta.findOrFail(params.id);
        await theRuta.load('municipios');
        return theRuta;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Ruta.query().paginate(page, perPage);
        } else {
          return await Ruta.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un Ruta
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el RutaValidator
      const payload = await request.validate(RutaValidator);

      // Crear el Ruta si la validación es exitosa
      const theRuta = await Ruta.create(payload);
      return theRuta;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un Ruta
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con RutaValidator
      payload = await request.validate(RutaValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el Ruta y actualizar los datos
    const theRuta = await Ruta.findOrFail(params.id);
    theRuta.punto_inicio= payload.punto_inicio;
    theRuta.punto_destino = payload.punto_destino;
    theRuta.fecha_entrega= payload.fecha_entrega;
    theRuta.contrato_id= payload.contrato_id;
    theRuta.vehiculo_conductor_id= payload.vehiculo_conductor_id;

    return await theRuta.save();
  }

  // Método para eliminar un Ruta
  public async delete({ params, response }: HttpContextContract) {
    const theRuta = await Ruta.findOrFail(params.id);
    response.status(204);
    return await theRuta.delete();
  }
}
