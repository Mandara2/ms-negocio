import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departamento from 'App/Models/Departamento';
import { Exception } from '@adonisjs/core/build/standalone';
import DepartamentoValidator from 'App/Validators/DepartamentoValidator'; // Importar el validador

export default class DepartamentosController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theDepartamento;

    try {
      if (params.id) {
        theDepartamento = await Departamento.findOrFail(params.id);
        await theDepartamento.load('municipios');
        return theDepartamento;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Departamento.query().paginate(page, perPage);
        } else {
          return await Departamento.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un departamento
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el DepartamentoValidator
      const payload = await request.validate(DepartamentoValidator);

      // Crear el departamento si la validación es exitosa
      const theDepartamento = await Departamento.create(payload);
      return theDepartamento;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un departamento
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con DepartamentoValidator
      payload = await request.validate(DepartamentoValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el departamento y actualizar los datos
    const theDepartamento = await Departamento.findOrFail(params.id);
    theDepartamento.nombre = payload.nombre;
    theDepartamento.region = payload.region;
    return await theDepartamento.save();
  }

  // Método para eliminar un departamento
  public async delete({ params, response }: HttpContextContract) {
    const theDepartamento = await Departamento.findOrFail(params.id);
    response.status(204);
    return await theDepartamento.delete();
  }
}
