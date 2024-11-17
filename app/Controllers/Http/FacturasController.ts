import { Exception } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Factura from "App/Models/Factura";
import FacturaValidator from "App/Validators/FacturaValidator";

export default class FacturasController {
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let theFactura: Factura = await Factura.findOrFail(params.id);
        theFactura.load("cuota");
        theFactura.load("gasto");
        return theFactura;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await Factura.query().paginate(page, perPage); // Devuelve una fracción de todas las Facturas
        } else {
          return await Factura.query(); // Devuelve todas las Facturas si no se especifica el ID
        }
      }
    } catch (error) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  // Método para crear una Factura
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el validador de Factura
      const payload = await request.validate(FacturaValidator);

      const fecha_hora = payload.fecha_hora.toJSDate();

      const theFactura = await Factura.create({
        ...payload,
        fecha_hora: fecha_hora
      });



      return theFactura;
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

  // Método para actualizar una Factura
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el validador de Factura
      payload = await request.validate(FacturaValidator);

      // Obtener la Factura y actualizar los datos
      const theFactura: Factura = await Factura.findOrFail(params.id);
      theFactura.fecha_hora = payload.fecha_hora;
      theFactura.monto = payload.monto;
      theFactura.cuota_id = payload.cuota_id;
      theFactura.gastos_id = payload.cuota_id;
      return await theFactura.save();
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

  // Método para eliminar una Factura
  public async delete({ params, response }: HttpContextContract) {
    try {
      const theFactura: Factura = await Factura.findOrFail(params.id);
      response.status(204);
      return await theFactura.delete();
    } catch (error) {
      // Manejo de errores al intentar eliminar la Factura
      throw new Exception(
        error.message || "Error al intentar eliminar la Factura",
        500
      );
    }
  }
}
