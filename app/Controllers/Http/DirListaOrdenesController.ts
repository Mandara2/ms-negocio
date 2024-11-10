import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DirListaOrden from 'App/Models/DirListaOrden';
import { Exception } from '@adonisjs/core/build/standalone';
import DirListaOrdenValidator from 'App/Validators/DirListaOrdenValidator'; // Importar el validador

export default class DirListaOrdenesController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theDirListaOrden;
    

    try {
      if (params.id) {
        theDirListaOrden = await DirListaOrden.findOrFail(params.id);
        await theDirListaOrden.load('municipios');
        return theDirListaOrden;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await DirListaOrden.query().paginate(page, perPage);
        } else {
          return await DirListaOrden.query();
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un DirListaOrden
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el DirListaOrdenValidator
      const payload = await request.validate(DirListaOrdenValidator);

      // Crear el DirListaOrden si la validación es exitosa
      const theDirListaOrden = await DirListaOrden.create(payload);
      return theDirListaOrden;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un DirListaOrden
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con DirListaOrdenValidator
      payload = await request.validate(DirListaOrdenValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    // Obtener el DirListaOrden y actualizar los datos
    const theDirListaOrden = await DirListaOrden.findOrFail(params.id);
    theDirListaOrden.orden= payload.orden;
    theDirListaOrden.descripcion = payload.descripcion;
    theDirListaOrden.ruta_id= payload.ruta_id;
    theDirListaOrden.direccion_id= payload.direccion_id;

    return await theDirListaOrden.save();
  }

  // Método para eliminar un DirListaOrden
  public async delete({ params, response }: HttpContextContract) {
    const theDirListaOrden = await DirListaOrden.findOrFail(params.id);
    response.status(204);
    return await theDirListaOrden.delete();
  }
}
