import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductores from 'App/Models/Conductor';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from '@adonisjs/core/build/standalone';
import ConductorValidator from 'App/Validators/ConductorValidator'; // Importar el validador

export default class ConductoresController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theConductor;

    try {
      if (params.id) {
        theConductor = await Conductores.findOrFail(params.id);

        // Llamada al microservicio de usuarios
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${theConductor.usuario_id}`, {
          headers: { Authorization: request.headers().authorization || '' }
        });

        // Verificar si userResponse.data es null o está vacío
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception('No se encontró información de usuario en el microservicio', 404);
        }

        // Combinar la respuesta con los datos del conductor
        return { conductor: theConductor, usuario: userResponse.data };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Conductores.query().paginate(page, perPage);
        } else {
          return await Conductores.query();
        }
      }
    } catch (error) {
      // Si hay un error, lanzar una excepción con un mensaje y código de estado
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un conductor
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar los datos utilizando el ConductorValidator
      const body = request.body();

      // Llamada al microservicio de usuarios para verificar el ID del usuario
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      // Verificar si no se encontró el usuario
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Exception('No se encontró información de usuario, verifique que el código sea correcto', 404);
      }

      // Crear el conductor si la validación es exitosa

      console.log(body);
      
      
      const theConductor = await Conductores.create(body);
      return theConductor;

    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un conductor
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos utilizando el ConductorValidator
      payload = await request.validate(ConductorValidator);

      // Llamada al microservicio de usuarios para verificar el ID del usuario
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${payload.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      // Verificar si no se encontró el usuario
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Exception('No se encontró información de usuario, verifique que el código sea correcto', 404);
      }

      // Obtener el conductor y actualizar los datos
      const theConductor = await Conductores.findOrFail(params.id);
      theConductor.usuario_id = payload.usuario_id;
      theConductor.telefono = payload.telefono;
      theConductor.fechaNacimiento = payload.fechaNacimiento;
      theConductor.numeroLicencia = payload.numeroLicencia;
      theConductor.fechaVencimientoLicencia = payload.fechaVencimientoLicencia;
      return await theConductor.save();
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para eliminar un conductor
  public async delete({ params, response }: HttpContextContract) {
    const theConductor = await Conductores.findOrFail(params.id);
    response.status(204);
    return await theConductor.delete();
  }
}
