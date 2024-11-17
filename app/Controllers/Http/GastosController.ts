import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gasto from 'App/Models/Gasto';
import GastoValidator from 'App/Validators/GastoValidator';

export default class GastosController {
    public async find({ request, params }: HttpContextContract) {
        try {
          if (params.id) {
            let theGasto: Gasto = await Gasto.findOrFail(params.id);
            await theGasto.load('conductor')
            await theGasto.load('dueno')
            await theGasto.load('servicio')
            return theGasto;
          } else {
            const data = request.all();
            if ('page' in data && 'per_page' in data) {
              const page = request.input('page', 1);
              const perPage = request.input('per_page', 20);
              return await Gasto.query().paginate(page, perPage); // Devuelve una fracción de todas las Gastos
            } else {
              return await Gasto.query(); // Devuelve todas las Gastos si no se especifica el ID
            }
          }
        } catch (error) {
          throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
        }
      }
    
      // Método para crear una Gasto
      public async create({ request, response }: HttpContextContract) {
        try {
          // Validar los datos utilizando el validador de Gasto
          const payload = await request.validate(GastoValidator);
    
          // Crear la Gasto si la validación es exitosa
          const theGasto = await Gasto.create(payload);
          return theGasto;
    
        } catch (error) {
          // Si el error es de validación, devolver los mensajes de error de forma legible
          if (error.messages) {
            return response.badRequest({ errors: error.messages.errors });
          }
          // Para cualquier otro tipo de error, lanzar una excepción genérica
          throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
        }
      }
    
      // Método para actualizar una Gasto
      public async update({ params, request, response }: HttpContextContract) {
        let payload;
    
        try {
          // Validar los datos utilizando el validador de Gasto
          payload = await request.validate(GastoValidator);
    
          // Obtener la Gasto y actualizar los datos
          const theGasto: Gasto = await Gasto.findOrFail(params.id);
          theGasto.detalles = payload.detalles;
          theGasto.dueno_id = payload.dueno_id;
          theGasto.servicio_id = payload.servicio_id;
          return await theGasto.save();
        } catch (error) {
          // Si el error es de validación, devolver los mensajes de error de forma legible
          if (error.messages) {
            return response.badRequest({ errors: error.messages.errors });
          }
          // Para cualquier otro tipo de error, lanzar una excepción genérica
          throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
        }
      }
    
      // Método para eliminar una Gasto
      public async delete({ params, response }: HttpContextContract) {
        try {
          const theGasto: Gasto = await Gasto.findOrFail(params.id);
          response.status(204);
          return await theGasto.delete();
        } catch (error) {
          // Manejo de errores al intentar eliminar la Gasto
          throw new Exception(error.message || 'Error al intentar eliminar la Gasto', 500);
        }
      }
}
