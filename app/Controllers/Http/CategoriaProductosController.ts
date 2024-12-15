import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CategoriaProducto from "App/Models/CategoriaProducto";
import CategoriaProductoValidator from 'App/Validators/CategoriasProductoValidator';

export default class CategoriaProductosController {
    // Método para encontrar CategoriaProductos
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id);
        await theCategoriaProducto.load('categoria');
        await theCategoriaProducto.load('producto');
        console.log(theCategoriaProducto);
        
        return theCategoriaProducto;
      } else {
        const data = request.all();
        if ('page' in data && 'per_page' in data) {
          const page = request.input('page', 1);
          const perPage = request.input('per_page', 20);  
          console.log(await CategoriaProducto.query().paginate(page, perPage));
          
          return await CategoriaProducto.query().paginate(page, perPage); // Devuelve una fracción de todas las CategoriaProductos
        } else {
          console.log(await CategoriaProducto.query());
          
          return await CategoriaProducto.query(); // Devuelve todas las CategoriaProductos si no se especifica el ID
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear una CategoriaProducto
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el validador de CategoriaProducto
      const payload = await request.validate(CategoriaProductoValidator);

      // Crear la CategoriaProducto si la validación es exitosa
      const theCategoriaProducto = await CategoriaProducto.create(payload);
      return theCategoriaProducto;

    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar una CategoriaProducto
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el validador de CategoriaProducto
      payload = await request.validate(CategoriaProductoValidator);

      // Obtener la CategoriaProducto y actualizar los datos
      const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id);
      theCategoriaProducto.producto_id = payload.producto_id;
      theCategoriaProducto.categoria_id = payload.categoria_id;
      theCategoriaProducto.detalle = payload.detalle;
      return await theCategoriaProducto.save();
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para eliminar una CategoriaProducto
  public async delete({ params, response }: HttpContextContract) {
    try {
      const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id);
      response.status(204);
      return await theCategoriaProducto.delete();
    } catch (error) {
      // Manejo de errores al intentar eliminar la CategoriaProducto
      throw new Exception(error.message || 'Error al intentar eliminar la CategoriaProducto', 500);
    }
  }
}
