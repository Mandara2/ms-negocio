import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel';
import HotelValidator from 'App/Validators/HoteleValidator';

export default class HotelsController {
    public async find({ request, params }: HttpContextContract) {
        try {
          if (params.id) {
            let theHotel: Hotel = await Hotel.findOrFail(params.id);
            await theHotel.load('servicio')
            return theHotel;
          } else {
            const data = request.all();
            if ('page' in data && 'per_page' in data) {
              const page = request.input('page', 1);
              const perPage = request.input('per_page', 20);
              return await Hotel.query().paginate(page, perPage); // Devuelve una fracción de todas las Hotels
            } else {
              return await Hotel.query(); // Devuelve todas las Hotels si no se especifica el ID
            }
          }
        } catch (error) {
          throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
        }
      }
    
      // Método para crear una Hotel
      public async create({ request, response }: HttpContextContract) {
        try {
          // Validar los datos utilizando el validador de Hotel
          const payload = await request.validate(HotelValidator);
          
          if (payload.servicio_id) {
                  const existe = await Hotel.query()
                    .where('servicio_id', payload.servicio_id)
                    .first();
            
                  if (existe) {
                    return response.conflict({
                      error: 'El servicio ya está asignado a otro centro de distribución',
                    });
                  }
                }
          

          // Crear la Hotel si la validación es exitosa
          const theHotel = await Hotel.create(payload);
          return theHotel;
    
        } catch (error) {
          // Si el error es de validación, devolver los mensajes de error de forma legible
          if (error.messages) {
            return response.badRequest({ errors: error.messages.errors });
          }
          // Para cualquier otro tipo de error, lanzar una excepción genérica
          throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
        }
      }
    
      // Método para actualizar una Hotel
      public async update({ params, request, response }: HttpContextContract) {
        let payload;
    
        try {
          // Validar los datos utilizando el validador de Hotel
          payload = await request.validate(HotelValidator);
          
          if (payload.servicio_id) {
                const existe = await Hotel.query()
                  .where('servicio_id', payload.servicio_id)
                  .andWhereNot('id', params.id) // Excluir el centro actual
                  .first();
          
                if (existe) {
                  return response.conflict({
                    error: 'El servicio ya está asignada a otro centro de distribución',
                  });
                }
              }

          // Obtener la Hotel y actualizar los datos
          const theHotel: Hotel = await Hotel.findOrFail(params.id);
          theHotel.nombre = payload.nombre;
          theHotel.ubicacion = payload.ubicacion;
          theHotel.servicio_id = payload.servicio_id;
          return await theHotel.save();
        } catch (error) {
          // Si el error es de validación, devolver los mensajes de error de forma legible
          if (error.messages) {
            return response.badRequest({ errors: error.messages.errors });
          }
          // Para cualquier otro tipo de error, lanzar una excepción genérica
          throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
        }
      }
    
      // Método para eliminar una Hotel
      public async delete({ params, response }: HttpContextContract) {
        try {
          const theHotel: Hotel = await Hotel.findOrFail(params.id);
          response.status(204);
          return await theHotel.delete();
        } catch (error) {
          // Manejo de errores al intentar eliminar la Hotel
          throw new Exception(error.message || 'Error al intentar eliminar la Hotel', 500);
        }
      }
}
