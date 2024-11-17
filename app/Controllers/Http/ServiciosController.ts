import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
//toca importar siempre
import Servicios from "App/Models/Servicio";
import axios from "axios";
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from "@adonisjs/core/build/standalone";


export default class ServiciosController {
  public async find({ request, params }: HttpContextContract) {
    let theServicios;

    try {
      if (params.id) {
        theServicios = await Servicios.findOrFail(params.id);

        // Llamada al microservicio de usuarios
        const userResponse = await axios.get(
          `${Env.get("MS_SECURITY")}/api/users/${theServicios.usuario_id}`,
          {
            headers: { Authorization: request.headers().authorization || "" },
          }
        );

        // Verificar si userResponse.data es null o está vacío
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception(
            "No se encontró información de usuario en el microservicio",
            404
          );
        }

        // Combinar la respuesta con los datos del Servicios
        return { Servicios: theServicios, usuario: userResponse.data };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await Servicios.query().paginate(page, perPage);
        } else {
          return await Servicios.query();
        }
      }
    } catch (error) {
      // Si hay un error, lanzar una excepción con un mensaje y código de estado
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  // Método para crear un Servicios
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el ServiciosValidator
      const payload = await request.validate(ServiciosValidator);
      const body = request.body();

      // Llamada al microservicio de usuarios para verificar el ID del usuario
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/api/users/${body.usuario_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );

      // Verificar si no se encontró el usuario
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Exception(
          "No se encontró información de usuario, verifique que el código sea correcto",
          404
        );
      }

      // Crear el Servicios si la validación es exitosa
      const theServicios = await Servicios.create(payload);
      return theServicios;
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

  // Método para actualizar un Servicios
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el ServiciosValidator
      payload = await request.validate(ServiciosValidator);
      const body = request.body();

      // Llamada al microservicio de usuarios para verificar el ID del usuario
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/api/users/${body.usuario_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );

      // Verificar si no se encontró el usuario
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Exception(
          "No se encontró información de usuario, verifique que el código sea correcto",
          404
        );
      }

      // Obtener el Servicios y actualizar los datos
      const theServicios = await Servicios.findOrFail(params.id);
      //CAMBIO ATRIBUTOS POR LOS DEL MODELO--------------------------------------------------------------------------
      theServicios.usuario_id = payload.usuario_id;
      theServicios.tipo = payload.tipo;
      theServicios.telefono = payload.telefono;
      return await theServicios.save();
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

  // Método para eliminar un Servicios
  public async delete({ params, response }: HttpContextContract) {
    const theServicios = await Servicios.findOrFail(params.id);
    response.status(204);
    return await theServicios.delete();
  }
}
