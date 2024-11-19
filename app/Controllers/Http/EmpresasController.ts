import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa';
import { Exception } from '@adonisjs/core/build/standalone';
import EmpresaValidator from 'App/Validators/EmpresaValidator'; // Importar el validador

export default class EmpresasController {
  // Método para encontrar empresas
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let theEmpresa: Empresa = await Empresa.findOrFail(params.id);
        console.log(theEmpresa);
        
        await theEmpresa.load('cliente');
        await theEmpresa.load('personaNatural');
        console.log(theEmpresa);
        
        return theEmpresa;
      } else {
        const data = request.all();
        if ('page' in data && 'per_page' in data) {
          const page = request.input('page', 1);
          const perPage = request.input('per_page', 20);
          return await Empresa.query().paginate(page, perPage); // Devuelve una fracción de todas las empresas
        } else {
          return await Empresa.query(); // Devuelve todas las empresas si no se especifica el ID
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear una empresa
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el validador de Empresa
      const payload = await request.validate(EmpresaValidator);

      // Crear la empresa si la validación es exitosa
      const theEmpresa = await Empresa.create(payload);
      return theEmpresa;

    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar una empresa
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el validador de Empresa
      payload = await request.validate(EmpresaValidator);

      // Obtener la empresa y actualizar los datos
      const theEmpresa: Empresa = await Empresa.findOrFail(params.id);
      theEmpresa.nit = payload.nit;
      theEmpresa.tipo_empresa = payload.tipo_empresa;
      theEmpresa.direccion_fiscal = payload.direccion_fiscal;
      theEmpresa.cliente_id = payload.cliente_id;
      return await theEmpresa.save();
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para eliminar una empresa
  public async delete({ params, response }: HttpContextContract) {
    try {
      const theEmpresa: Empresa = await Empresa.findOrFail(params.id);
      response.status(204);
      return await theEmpresa.delete();
    } catch (error) {
      // Manejo de errores al intentar eliminar la empresa
      throw new Exception(error.message || 'Error al intentar eliminar la empresa', 500);
    }
  }
}
