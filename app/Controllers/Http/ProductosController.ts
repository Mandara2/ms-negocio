import { Exception } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Producto from "App/Models/Producto";
import ProductoValidator from "App/Validators/ProductoValidator";
import { DateTime } from "luxon";

export default class ProductosController {
  // Método para encontrar Productos
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const theProducto = await Producto.findOrFail(params.id);
        await theProducto.load('cliente');
        await theProducto.load('lote');

        // Formatear fechas antes de devolver
        return {
          ...theProducto.toJSON(),
          fecha_vencimiento: DateTime.fromJSDate(theProducto.fecha_vencimiento).toFormat('yyyy-MM-dd'),
        };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);

          // Obtener datos paginados
          const paginatedProductos = await Producto.query().paginate(page, perPage);

          // Formatear fechas después de obtener los datos
          const formattedProductos = paginatedProductos.toJSON();
          formattedProductos.data = formattedProductos.data.map(Producto => ({
            ...Producto,
            fecha_vencimiento: DateTime.fromJSDate(new Date(Producto.fecha_vencimiento)).toFormat('yyyy-MM-dd'),
          }));

          return formattedProductos;
        } else {
          // Consultar todos los Productos y formatear fechas
          const Productos = await Producto.query();
          return Productos.map(Producto => ({
            ...Producto.toJSON(),
            fecha_vencimiento: DateTime.fromJSDate(new Date(Producto.fecha_vencimiento)).toFormat('yyyy-MM-dd'),
          }));
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear una Producto
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el validador de Producto
      const payload = await request.validate(ProductoValidator);


      const fecha_vencimiento_date = payload.fecha_vencimiento.toJSDate();
      // Crear la Producto si la validación es exitosa
      const theProducto = await Producto.create({
        ...payload,
        fecha_vencimiento: fecha_vencimiento_date,
        });
      return theProducto;


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

  // Método para actualizar una Producto
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el validador de Producto
      payload = await request.validate(ProductoValidator);

      const fecha_vencimiento = payload.fecha_vencimiento.toJSDate();

      const theProducto: Producto = await Producto.findOrFail(params.id);
      theProducto.nombre = payload.nombre;
      theProducto.fecha_vencimiento = fecha_vencimiento;
      theProducto.cliente_id = payload.cliente_id;
      theProducto.lote_id = payload.lote_id;
      return await theProducto.save();
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

  // Método para eliminar una Producto
  public async delete({ params, response }: HttpContextContract) {
    try {
      const theProducto: Producto = await Producto.findOrFail(params.id);
      response.status(204);
      return await theProducto.delete();
    } catch (error) {
      // Manejo de errores al intentar eliminar la Producto
      throw new Exception(
        error.message || "Error al intentar eliminar la Producto",
        500
      );
    }
  }
}
