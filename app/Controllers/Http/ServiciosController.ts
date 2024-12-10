import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
//toca importar siempre
import Servicio from "App/Models/Servicio";
import { Exception } from "@adonisjs/core/build/standalone";
import ServicioValidator from "App/Validators/ServicioValidator";
import { DateTime } from "luxon";

export default class ServiciosController {
  // Método para encontrar Servicios
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const theServicio = await Servicio.findOrFail(params.id);
        await theServicio.load('administrador');

        // Formatear fechas antes de devolver
        return {
          ...theServicio.toJSON(),
          fecha: DateTime.fromJSDate(theServicio.fecha).toFormat('yyyy-MM-dd'),
        };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);

          // Obtener datos paginados
          const paginatedServicios = await Servicio.query().paginate(page, perPage);

          // Formatear fechas después de obtener los datos
          const formattedServicios = paginatedServicios.toJSON();
          formattedServicios.data = formattedServicios.data.map(Servicio => ({
            ...Servicio,
            fecha: DateTime.fromJSDate(new Date(Servicio.fecha)).toFormat('yyyy-MM-dd'),
          }));

          return formattedServicios;
        } else {
          // Consultar todos los Servicios y formatear fechas
          const Servicios = await Servicio.query();
          return Servicios.map(Servicio => ({
            ...Servicio.toJSON(),
            fecha: DateTime.fromJSDate(new Date(Servicio.fecha)).toFormat('yyyy-MM-dd'),
          }));
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear una Servicio
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el validador de Servicio
      const payload = await request.validate(ServicioValidator);

      // Crear la Servicio si la validación es exitosa
      const fecha_date = payload.fecha.toJSDate();
          
      const theServicio = await Servicio.create({
        ...payload,
        fecha: fecha_date,
        });



      return theServicio;
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

  // Método para actualizar una Servicio
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el validador de Servicio
      payload = await request.validate(ServicioValidator);

      // Obtener la Servicio y actualizar los datos
      const theServicio: Servicio = await Servicio.findOrFail(params.id)

      const fecha = payload.fecha.toJSDate();

      theServicio.fecha = fecha;
      theServicio.descripcion = payload.descripcion;
      theServicio.administrador_id = payload.administrador_id;
      return await theServicio.save();
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

  // Método para eliminar una Servicio
  public async delete({ params, response }: HttpContextContract) {
    try {
      const theServicio: Servicio = await Servicio.findOrFail(params.id);
      response.status(204);
      return await theServicio.delete();
    } catch (error) {
      // Manejo de errores al intentar eliminar la Servicio
      throw new Exception(
        error.message || "Error al intentar eliminar la Servicio",
        500
      );
    }
  }
}
