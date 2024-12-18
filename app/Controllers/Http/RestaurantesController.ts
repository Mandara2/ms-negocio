import { Exception } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Restaurante from "App/Models/Restaurante";
import RestauranteValidator from "App/Validators/RestauranteValidator";

export default class RestaurantesController {
  // Método para encontrar Restaurantes
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let theRestaurante: Restaurante = await Restaurante.findOrFail(
          params.id
        );
        await theRestaurante.load("servicio");
        return theRestaurante;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await Restaurante.query().paginate(page, perPage); // Devuelve una fracción de todas las Restaurantes
        } else {
          return await Restaurante.query(); // Devuelve todas las Restaurantes si no se especifica el ID
        }
      }
    } catch (error) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  // Método para crear una Restaurante
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el validador de Restaurante
      const payload = await request.validate(RestauranteValidator);

      if (payload.servicio_id) {
              const existe = await Restaurante.query()
                .where('servicio_id', payload.servicio_id)
                .first();
        
              if (existe) {
                return response.conflict({
                  error: 'El servicio ya está asignado a otro restaurante',
                });
              }
            }

      // Crear la Restaurante si la validación es exitosa
      const theRestaurante = await Restaurante.create(payload);
      return theRestaurante;
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  // Método para actualizar una Restaurante
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el validador de Restaurante
      payload = await request.validate(RestauranteValidator);

      if (payload.servicio_id) {
            const existe = await Restaurante.query()
              .where('servicio_id', payload.servicio_id)
              .andWhereNot('id', params.id) // Excluir el centro actual
              .first();
      
            if (existe) {
              return response.conflict({
                error: 'El servicio ya está asignado a otro restaurante',
              });
            }
          }

      // Obtener la Restaurante y actualizar los datos
      const theRestaurante: Restaurante = await Restaurante.findOrFail(
        params.id
      );
      theRestaurante.nombre = payload.nombre;
      theRestaurante.ubicacion = payload.ubicacion;
      theRestaurante.servicio_id = payload.servicio_id;
      return await theRestaurante.save();
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  // Método para eliminar una Restaurante
  public async delete({ params, response }: HttpContextContract) {
    try {
      const theRestaurante: Restaurante = await Restaurante.findOrFail(
        params.id
      );
      response.status(204);
      return await theRestaurante.delete();
    } catch (error) {
      // Manejo de errores al intentar eliminar la Restaurante
      throw new Exception(
        error.message || "Error al intentar eliminar la Restaurante",
        500
      );
    }
  }
}
