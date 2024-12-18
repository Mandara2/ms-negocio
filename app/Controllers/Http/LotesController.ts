import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lote from 'App/Models/Lote';
import { Exception } from '@adonisjs/core/build/standalone';
import LoteValidator from 'App/Validators/LoteValidator'; // Importar el validador

export default class LotesController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theLote;
    

    try {
      if (params.id) {
        theLote = await Lote.findOrFail(params.id);
        await theLote.load('dirListaOrden');
        return theLote;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Lote.query().paginate(page, perPage);
        } else {
          return await Lote.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un Lote
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el LoteValidator
      const payload = await request.validate(LoteValidator);
      
      if (payload.dir_lista_orden_id) {
              const existe = await Lote.query()
                .where('dir_lista_orden_id', payload.dir_lista_orden_id)
                .first();
        
              if (existe) {
                return response.conflict({
                  error: 'El orden ya está asignada a otro centro de distribución',
                });
              }
            }

      // Crear el Lote si la validación es exitosa
      const theLote = await Lote.create(payload);
      return theLote;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un Lote
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con LoteValidator
      payload = await request.validate(LoteValidator);
      if (payload.dir_lista_orden_id) {
            const existe = await Lote.query()
              .where('dir_lista_orden_id', payload.dir_lista_orden_id)
              .andWhereNot('id', params.id) // Excluir el centro actual
              .first();
      
            if (existe) {
              return response.conflict({
                error: 'El orden ya está asignada a otro centro de distribución',
              });
            }
          }
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el Lote y actualizar los datos
    const theLote = await Lote.findOrFail(params.id);
    theLote.peso= payload.peso;
    theLote.volumen = payload.volumen;
  //theLote.ruta_id = payload.lote_id;
    theLote.dir_lista_orden_id= payload.dir_lista_orden;

    return await theLote.save();
  }

  // Método para eliminar un Lote
  public async delete({ params, response }: HttpContextContract) {
    const theLote = await Lote.findOrFail(params.id);
    response.status(204);
    return await theLote.delete();
  }
}
