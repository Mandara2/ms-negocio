import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import personaNatural from 'App/Models/PersonaNatural';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import { Exception } from '@adonisjs/core/build/standalone';
import PersonaNatural from 'App/Models/PersonaNatural';

export default class personasNaturalessController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        
        let thepersonaNatural;
        
        try {
          if (params.id) {

            thepersonaNatural = await PersonaNatural.findOrFail(params.id);

            await thepersonaNatural.load("cliente")
    
            // Llamada al microservicio de usuarios
            const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${thepersonaNatural.usuario_id}`, {
              headers: { Authorization: request.headers().authorization || '' }
            });
    
            // Verificar si userResponse.data es null o está vacío
            if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
              throw new Exception('No se encontró información de usuario en el microservicio', 404);
            }
    
            // Combinar la respuesta con los datos del cliente
            return { cliente: thepersonaNatural, usuario: userResponse.data };
          } else {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
              const page = request.input('page', 1);
              const perPage = request.input("per_page", 20);
              return await PersonaNatural.query().paginate(page, perPage);
            } else {
              return await PersonaNatural.query();
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
        const thepersonaNatural: personaNatural = await personaNatural.create(body);
        return thepersonaNatural;
    }

    public async update({ params, request }: HttpContextContract) {
        const thepersonaNatural: personaNatural = await personaNatural.findOrFail(params.id);
        const body = request.body();
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${body.usuario_id}`, {
            headers: { Authorization: request.headers().authorization || '' }
          });
          if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
            throw new Error('No se encontró información de usuario, verifique que el codigo sea correcto');
          }
        thepersonaNatural.usuario_id = body.usuario_id;
        thepersonaNatural.identificacion = body.identificacion;
        thepersonaNatural.tipoDocumento = body.tipoDocumento;
        thepersonaNatural.fechaNacimiento = body.fechaNacimiento;
        thepersonaNatural.cliente_id = body.cliente_id;
        return await thepersonaNatural.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thepersonaNatural: personaNatural = await personaNatural.findOrFail(params.id);
            response.status(204);
            return await thepersonaNatural.delete();
    }
}

