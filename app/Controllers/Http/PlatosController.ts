import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Exception } from "@adonisjs/core/build/standalone";
import Plato from "App/Models/Plato";
import PlatoValidator from 'App/Validators/PlatoValidator';

export default class PlatosController {
    // Método para encontrar Platos
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let thePlato: Plato = await Plato.findOrFail(params.id);
        return thePlato;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await Plato.query().paginate(page, perPage); // Devuelve una fracción de todas las Platos
        } else {
          return await Plato.query(); // Devuelve todas las Platos si no se especifica el ID
        }
      }
    } catch (error) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  // Método para crear una Plato
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el validador de Plato
      const payload = await request.validate(PlatoValidator);


      // Crear la Plato si la validación es exitosa
      const thePlato = await Plato.create({
        ...payload,
        });
      return thePlato;


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

  // Método para actualizar una Plato
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el validador de Plato
      payload = await request.validate(PlatoValidator);


      const thePlato: Plato = await Plato.findOrFail(params.id);
      thePlato.nombre = payload.nombre;
      thePlato.descripcion = payload.descripcion;
      return await thePlato.save();
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

  // Método para eliminar una Plato
  public async delete({ params, response }: HttpContextContract) {
    try {
      const thePlato: Plato = await Plato.findOrFail(params.id);
      response.status(204);
      return await thePlato.delete();
    } catch (error) {
      // Manejo de errores al intentar eliminar la Plato
      throw new Exception(
        error.message || "Error al intentar eliminar la Plato",
        500
      );
    }
  }
}
