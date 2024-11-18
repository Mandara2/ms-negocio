import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria';
import CategoriaValidator from 'App/Validators/CategoriaValidator';

export default class CategoriasController {
    // Método para encontrar Categorias
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let theCategoria: Categoria = await Categoria.findOrFail(params.id);
        await theCategoria.load('subcategoria');
        return theCategoria;
      } else {
        const data = request.all();
        if ('page' in data && 'per_page' in data) {
          const page = request.input('page', 1);
          const perPage = request.input('per_page', 20);
          return await Categoria.query().paginate(page, perPage); // Devuelve una fracción de todas las Categorias
        } else {
          return await Categoria.query(); // Devuelve todas las Categorias si no se especifica el ID
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear una Categoria
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el validador de Categoria
      const payload = await request.validate(CategoriaValidator);

      // Crear la Categoria si la validación es exitosa
      const body = request.body();
      const theCategoria = await Categoria.create({
        ...payload,
        categoria_padre: body.categoria_padre,
      });
      return theCategoria;

    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar una Categoria
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el validador de Categoria
      payload = await request.validate(CategoriaValidator);

      // Obtener la Categoria y actualizar los datos
      const theCategoria: Categoria = await Categoria.findOrFail(params.id);
      theCategoria.nombre = payload.nombre;
      theCategoria.descripcion = payload.descripcion;
      theCategoria.categoria_padre = payload.categoria_padre;
      return await theCategoria.save();
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para eliminar una Categoria
  public async delete({ params, response }: HttpContextContract) {
    try {
      const theCategoria: Categoria = await Categoria.findOrFail(params.id);
      response.status(204);
      return await theCategoria.delete();
    } catch (error) {
      // Manejo de errores al intentar eliminar la Categoria
      throw new Exception(error.message || 'Error al intentar eliminar la Categoria', 500);
    }
  }
}
