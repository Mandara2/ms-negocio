import { Exception } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Factura from "App/Models/Factura";
import FacturaValidator from "App/Validators/FacturaValidator";
import { DateTime } from "luxon";

export default class FacturasController {
  // Método para verificar si una factura existe
  public async checkFacturaExists({ params, response }: HttpContextContract) {
    try {
      const facturaId = params.id; // Obtiene el ID de la factura desde los parámetros de la URL

      // Verificar si la factura existe
      const factura = await Factura.find(facturaId);

      if (!factura) {
        // Si no existe, devolver un error 404
        return response.status(404).json({ error: "Factura no encontrada" });
      }

      // Si la factura ya está en estado "PAGADO", devolver un error 404
      if (factura.estado === "PAGADO") {
        return response.status(404).json({ error: "Factura ya está en estado 'PAGADO'" });
      }

      // Si la factura existe y no está en "PAGADO", actualizar su estado a "PAGADO"
      factura.estado = "PAGADO";
      await factura.save();

      // Devolver una respuesta indicando que la factura se actualizó a "PAGADO"
      return response
        .status(200)
        .json({ success: true, message: "Factura encontrada y actualizada a 'PAGADO'" });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error al verificar y actualizar la factura" });
    }
  }

  // Metodo de buscar
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const theFactura = await Factura.findOrFail(params.id);
        await theFactura.load('cuota');
        await theFactura.load('gasto');

        // Formatear fechas antes de devolver
        return {
          ...theFactura.toJSON(),
          fecha_hora: DateTime.fromJSDate(theFactura.fecha_hora).toFormat('yyyy-MM-dd'),
        };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);

          // Obtener datos paginados
          const paginatedFacturas = await Factura.query().paginate(page, perPage);

          // Formatear fechas después de obtener los datos
          const formattedFacturas = paginatedFacturas.toJSON();
          formattedFacturas.data = formattedFacturas.data.map(Factura => ({
            ...Factura,
            fecha_inicio: DateTime.fromJSDate(new Date(Factura.fecha_inicio)).toFormat('yyyy-MM-dd'),
            fecha_fin: DateTime.fromJSDate(new Date(Factura.fecha_fin)).toFormat('yyyy-MM-dd'),
          }));

          return formattedFacturas;
        } else {
          // Consultar todos los Facturas y formatear fechas
          const Facturas = await Factura.query();
          return Facturas.map(Factura => ({
            ...Factura.toJSON(),
            fecha_hora: DateTime.fromJSDate(new Date(Factura.fecha_hora)).toFormat('yyyy-MM-dd'),
          }));
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
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
        fecha_hora: fecha_hora,
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
      const fecha_hora = payload.fecha_hora.toJSDate();
      theFactura.fecha_hora = fecha_hora;
      theFactura.monto = payload.monto;
      theFactura.estado = payload.estado;
      theFactura.detalles = payload.detalles;
      theFactura.cuota_id = payload.cuota_id;
      theFactura.gasto_id = payload.cuota_id;
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
