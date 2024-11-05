import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dueno from 'App/Models/Dueno';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from '@adonisjs/core/build/standalone';

export default class DuenosController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        let theDueno;
    
        try {
          if (params.id) {
            theDueno = await Dueno.findOrFail(params.id);
    
            // Llamada al microservicio de usuarios
            const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${theDueno.usuario_id}`, {
              headers: { Authorization: request.headers().authorization || '' }
            });
    
            // Verificar si userResponse.data es null o está vacío
            if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
              throw new Exception('No se encontró información de usuario en el microservicio', 404);
            }
    
            // Combinar la respuesta con los datos del cliente
            return { cliente: theDueno, usuario: userResponse.data };
          } else {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
              const page = request.input('page', 1);
              const perPage = request.input("per_page", 20);
              return await Dueno.query().paginate(page, perPage);
            } else {
              return await Dueno.query();
            }
          }
        } catch (error) {
          // Si hay un error, lanzar una excepción con un mensaje y código de estado
          throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
        }
      }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
            headers: { Authorization: request.headers().authorization || '' }
          });
          if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
            throw new Error('No se encontró información de usuario, verifique que el codigo sea correcto');
          }
        const theDueno: Dueno = await Dueno.create(body);
        return theDueno;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDueno: Dueno = await Dueno.findOrFail(params.id);
        const body = request.body();
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
            headers: { Authorization: request.headers().authorization || '' }
          });
          if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
            throw new Error('No se encontró información de usuario, verifique que el codigo sea correcto');
          }
        theDueno.usuario_id = body.usuario_id;
        theDueno.telefono = body.telefono;
        theDueno.fechaNacimiento = body.fechaNacimiento;
        theDueno.conductor_id = body.conductor_id;
        return await theDueno.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDueno: Dueno = await Dueno.findOrFail(params.id);
            response.status(204);
            return await theDueno.delete();
    }
}

