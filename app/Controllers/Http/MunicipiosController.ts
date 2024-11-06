import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio';
import { Exception } from '@adonisjs/core/build/standalone';
import MunicipioValidator from 'App/Validators/MunicipioValidator'; // Importar el validador

export default class MunicipiosController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theMunicipio;

    try {
      if (params.id) {
        theMunicipio = await Municipio.findOrFail(params.id);
        await theMunicipio.load("departamento");
        await theMunicipio.load('direcciones');
        return theMunicipio;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Municipio.query().paginate(page, perPage);
        } else {
          return await Municipio.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un municipio
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el MunicipioValidator
      const payload = await request.validate(MunicipioValidator);

      // Crear el municipio si la validación es exitosa
      const theMunicipio = await Municipio.create(payload);
      return theMunicipio;

    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un municipio
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con MunicipioValidator
      payload = await request.validate(MunicipioValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el municipio y actualizar los datos
    const theMunicipio = await Municipio.findOrFail(params.id);
    theMunicipio.nombre = payload.nombre;
    theMunicipio.codigoPostal = payload.codigoPostal;
    theMunicipio.departamento_id = payload.departamento_id;
    return await theMunicipio.save();
  }

  // Método para eliminar un municipio
  public async delete({ params, response }: HttpContextContract) {
    const theMunicipio = await Municipio.findOrFail(params.id);
    response.status(204);
    return await theMunicipio.delete();
  }
}
