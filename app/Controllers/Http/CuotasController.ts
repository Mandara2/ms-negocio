import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota';
import { Exception } from '@adonisjs/core/build/standalone';
import CuotaValidator from 'App/Validators/CuotaValidator'; // Importar el validador

export default class CuotasController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theCuota;
    

    try {
      if (params.id) {
        theCuota = await Cuota.findOrFail(params.id);
        await theCuota.load('municipios');
        return theCuota;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Cuota.query().paginate(page, perPage);
        } else {
          return await Cuota.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un Cuota
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el CuotaValidator
      const payload = await request.validate(CuotaValidator);

      // Crear el Cuota si la validación es exitosa
      const theCuota = await Cuota.create(payload);
      return theCuota;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un Cuota
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con CuotaValidator
      payload = await request.validate(CuotaValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el Cuota y actualizar los datos
    const theCuota = await Cuota.findOrFail(params.id);
    theCuota.monto= payload.monto;
    theCuota.intereses = payload.intereses;
    theCuota.numero= payload.numero;
    theCuota.contrato_id= payload.contrato_id;
    return await theCuota.save();
  }

  // Método para eliminar un Cuota
  public async delete({ params, response }: HttpContextContract) {
    const theCuota = await Cuota.findOrFail(params.id);
    response.status(204);
    return await theCuota.delete();
  }
}
