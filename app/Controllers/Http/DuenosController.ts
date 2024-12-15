import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dueno from 'App/Models/Dueno';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from '@adonisjs/core/build/standalone';
import DuenoValidator from 'App/Validators/DuenoValidator';
import { DateTime } from 'luxon';

export default class DuenosController { //se encarga de hacer las operaciones de CRUD
  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        const theDueno = await Dueno.findOrFail(params.id);

        // Formatear la fecha de nacimiento sin alterar el modelo original
        const formattedDueno = {
          ...theDueno.toJSON(),
          fecha_nacimiento: DateTime.fromJSDate(new Date(theDueno.fecha_nacimiento)).toFormat('yyyy-MM-dd'),
        };

        // Llamada al microservicio de usuarios
        const userResponse = await axios.get(
          `${Env.get('MS_SECURITY')}/api/users/${theDueno.usuario_id}`,
          {
            headers: { Authorization: request.headers().authorization || '' },
          }
        );

        // Verificar si userResponse.data es null o está vacío
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          return response.notFound({
            error: 'No se encontró información de usuario, verifique que el código sea correcto',
          });
        }
        console.log("thedueno");
        
        // Combinar la respuesta con los datos del cliente
        console.log(theDueno);
        
        return { theDueno: formattedDueno, usuario: userResponse.data };
      } else {
        const data = request.all();
        if ('page' in data && 'per_page' in data) {
          const page = request.input('page', 1);
          const perPage = request.input('per_page', 20);

          // Obtener datos paginados
          const paginatedDuenos = await Dueno.query().paginate(page, perPage);

          // Formatear las fechas de nacimiento en los resultados paginados
          const formattedDuenos = paginatedDuenos.toJSON();
          formattedDuenos.data = formattedDuenos.data.map((dueno) => ({
            ...dueno,
            fecha_nacimiento: DateTime.fromJSDate(new Date(dueno.fecha_nacimiento)).toFormat('yyyy-MM-dd'),
          }));
          console.log("Formated");
          
          console.log(formattedDuenos);
          
          return formattedDuenos;
        } else {
          // Consultar todos los dueños y formatear las fechas de nacimiento
          const duenos = await Dueno.query();
          return duenos.map((dueno) => ({
            ...dueno.toJSON(),
            fecha_nacimiento: DateTime.fromJSDate(new Date(dueno.fecha_nacimiento)).toFormat('yyyy-MM-dd'),
          }));
        }
      }
    } catch (error) {
      // Si hay un error, lanzar una excepción con un mensaje y código de estado
      throw new Exception(
        error.message || 'Error al procesar la solicitud',
        error.status || 500
      );
    }
  }

    public async create({ request,response }: HttpContextContract) { 
        const body = request.body();
        const payload = await request.validate(DuenoValidator);

        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
            headers: { Authorization: request.headers().authorization || '' }
          });
          if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
            return response.notFound({ error: 'No se encontró información de usuario, verifique que el código sea correcto' });
          }
        
          const fecha_nacimiento_date = payload.fecha_nacimiento.toJSDate();
          
      const theDueno = await Dueno.create({
        ...payload,
        fecha_nacimiento: fecha_nacimiento_date,
        usuario_id: body.usuario_id
        });

        return theDueno;
    }

    public async update({ params, request, response }: HttpContextContract) {
      let payload;

      try {
        // Validar los datos utilizando el ConductorValidator
        payload = await request.validate(DuenoValidator);
        const body = request.body();
  
        const theDueno = await Dueno.findOrFail(params.id);
  
        // Llamada al microservicio de usuarios para verificar el ID del usuario
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
          headers: { Authorization: request.headers().authorization || '' }
        });
  
        // Verificar si no se encontró el usuario
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          return response.notFound({ error: 'No se encontró información de usuario, verifique que el código sea correcto' });
        }
  
        const fechaNacimientoDate = payload.fecha_nacimiento.toJSDate();
        // Obtener el conductor y actualizar los datos
        theDueno.merge({
          usuario_id: body.usuario_id,
          fecha_nacimiento: fechaNacimientoDate,
          telefono: body.telefono,
          conductor_id: body.conductor_id
        });
  
        return await theDueno.save();
      } catch (error) {
        // Si el error es de validación, devolver los mensajes de error de forma legible
        if (error.messages) {
          return response.badRequest({ errors: error.messages.errors });
        }
        // Para cualquier otro tipo de error, lanzar una excepción genérica
        throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
      }
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDueno: Dueno = await Dueno.findOrFail(params.id);
            response.status(204);
            return await theDueno.delete();
    }
}

