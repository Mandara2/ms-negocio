import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PlatoRestaurante from 'App/Models/PlatoRestaurante';
import PlatoRestauranteValidator from 'App/Validators/PlatoRestauranteValidator';
import Env from '@ioc:Adonis/Core/Env';
import Servicio from 'App/Models/Servicio';
import Restaurante from 'App/Models/Restaurante';
import Administrador from 'App/Models/Administrador';
import axios from 'axios';

export default class PlatoRestaurantesController {// Método de búsqueda
    public async find({ request, params }: HttpContextContract) {
      let thePlatoRestaurante;
      
  
      try {
        if (params.id) {
          thePlatoRestaurante = await PlatoRestaurante.findOrFail(params.id);
          await thePlatoRestaurante.load('plato');
          await thePlatoRestaurante.load('restaurante');
          return thePlatoRestaurante;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await PlatoRestaurante.query().paginate(page, perPage);
          } else {
            return await PlatoRestaurante.query();
          }
        }
      } catch (error) {
        throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
      }
    }
  
    // Método para crear un PlatoRestaurante
    public async create({ request, response }: HttpContextContract) {
      try {
        // Validar datos usando el PlatoRestauranteValidator
        const payload = await request.validate(PlatoRestauranteValidator);
  
        //busco el restaurante
        const restauranteId = await Restaurante.find(payload.restaurante_id)

        console.log('Este es el restauranteeeeeeeeeee');
        
        console.log(restauranteId);
        
        if (!restauranteId) {
            throw new Exception("El restaurante no existe")
        }
        //busco el servicio id en el restaurante
         const servicioId = restauranteId.servicio_id

        // //busco ese servicio

        const servicio = await Servicio.find(servicioId)

        if (!servicio) {
            throw new Exception("El servicio no existe")
        }

        // //obtengo el id del administrador de ese servicio
         const adminId = servicio.administrador_id

        //obtengo la informacion de ese administrador

        const infoAdmin = await Administrador.find(adminId)

        console.log("Este es el info Adminnnnnnnnnnnnnnn");
        console.log(infoAdmin);
        
        
        // //Ahora obtengo el usuario de ese administrador

        if (!infoAdmin) {
            throw new Exception("El administrador no existe")
        }

        const userAdmin = infoAdmin.usuario_id;

        //llamo a security para que me valide si ese usuario existe y para sacar el email
        
        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${userAdmin}`, {
            headers: { Authorization: request.headers().authorization || '' }
           });
    
       // Verificar si no se encontró información del usuario en el microservicio
          if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
           return response.notFound({ error: 'No se encontró información de usuario, verifique que el código sea correcto' });
           }

         //Ahora creo el email

         const email = {
             subject: "Nuevo plato agregado!",
             recipient: userResponse.data.email, // Correo del destinatario
             body_html: `<p>Nuevo plato generado. Se ha generado el plato ${payload.plato_id}</p>`
           };

    
           // Enviar el correo al administrador
           const responseEmail = await axios.post(`${Env.get('MS_NOTIFICACIONES')}/send-email`, email, {
             headers: {
               'Content-Type': 'application/json',
             },
           });
           console.log(responseEmail);

           const newPlatoRestaurante = await PlatoRestaurante.create({
            plato_id: payload.plato_id,
            restaurante_id: payload.restaurante_id,
            precio: payload.precio,
          });
      
          // Devolver el registro creado, incluyendo el ID
          return response.created({
            message: "PlatoRestaurante creado exitosamente",
            data: {
              id: newPlatoRestaurante.id,
              plato_id: newPlatoRestaurante.plato_id,
              restaurante_id: newPlatoRestaurante.restaurante_id,
              precio: newPlatoRestaurante.precio,
            },
          });
        
      } catch (error) {
        // Si el error es de validación, devolver los mensajes de error de forma legible
        if (error.messages) {
          return response.badRequest({ errors: error.messages.errors });
        }
        // Para cualquier otro tipo de error, lanzar una excepción genérica
        throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
      }
    }
  
    // Método para actualizar un PlatoRestaurante
    public async update({ params, request, response }: HttpContextContract) {
      let payload;
  
      try {
        // Validar los datos con PlatoRestauranteValidator
        payload = await request.validate(PlatoRestauranteValidator);
      } catch (error) {
        // Si el error es de validación, devolver los mensajes de error de forma legible
        if (error.messages) {
          return response.badRequest({ errors: error.messages.errors });
        }
        // Si es otro tipo de error, lanzar una excepción genérica
        throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
      }

      // Obtener el PlatoRestaurante y actualizar los datos
      const thePlatoRestaurante = await PlatoRestaurante.findOrFail(params.id);
      thePlatoRestaurante.precio= payload.precio;
      thePlatoRestaurante.plato_id = payload.plato_id;
      thePlatoRestaurante.restaurante_id= payload.restaurante_id;
      return await thePlatoRestaurante.save();
    }
  
    // Método para eliminar un PlatoRestaurante
    public async delete({ params, response }: HttpContextContract) {
      const thePlatoRestaurante = await PlatoRestaurante.findOrFail(params.id);
      response.status(204);
      return await thePlatoRestaurante.delete();
    }}
