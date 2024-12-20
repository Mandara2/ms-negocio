import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contrato from 'App/Models/Contrato';
import { Exception } from '@adonisjs/core/build/standalone';
import ContratoValidator from 'App/Validators/ContratoValidator'; // Importar el validador
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import Ruta from 'App/Models/Ruta';
import { DateTime } from 'luxon';
import PersonaNatural from 'App/Models/PersonaNatural';
import Ws from 'App/services/Ws';

export default class ContratosController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const theContrato = await Contrato.findOrFail(params.id);
        await theContrato.load('cliente');

        // Formatear fechas antes de devolver
        return {
          ...theContrato.toJSON(),
          fecha: DateTime.fromJSDate(theContrato.fecha).toFormat('yyyy-MM-dd'),
        };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);

          // Obtener datos paginados
          const paginatedContratos = await Contrato.query().paginate(page, perPage);

          // Formatear fechas después de obtener los datos
          const formattedContratos = paginatedContratos.toJSON();
          formattedContratos.data = formattedContratos.data.map(Contrato => ({
            ...Contrato,
            fecha: DateTime.fromJSDate(new Date(Contrato.fecha)).toFormat('yyyy-MM-dd'),
          }));

          return formattedContratos;
        } else {
          // Consultar todos los Contratos y formatear fechas
          const Contratos = await Contrato.query();
          return Contratos.map(Contrato => ({
            ...Contrato.toJSON(),
            fecha: DateTime.fromJSDate(new Date(Contrato.fecha)).toFormat('yyyy-MM-dd'),
          }));
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un Contrato
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el ContratoValidator
      const payload = await request.validate(ContratoValidator);
      console.log("ESTE ES EL CLIENTEEEEEEEEEE");
      console.log(payload.cliente_id);
      
      // Buscar cliente relacionado
      const personaNatural = await PersonaNatural.find(payload.cliente_id);
      if (!personaNatural) {
        throw new Exception("No se pudo encontrar al cliente");
      }
      
      // Obtener el usuario asociado al cliente
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${personaNatural.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      console.log("Este es el userResponse");
      console.log(userResponse.data.email);

      // Crear el email a enviar
      

      
      // Convertir fecha_nacimiento a Date
      const fecha = payload.fecha.toJSDate();

      const theContrato = await Contrato.create({
        ...payload,
        fecha: fecha
      });

      // Obtener las rutas asociadas al contrato (dependiendo de la lógica de tu negocio)
      // Aquí deberías definir cómo se asocian las rutas, por ejemplo, según el cliente o algún otro parámetro
      const rutas = await Ruta.query().where('contrato_id', theContrato.id); // Ejemplo de filtro por cliente_id
      console.log("Esta es la rutaaaaaaaaaaaaaaa");
      console.log(rutas);
      
      
      // Asociar las rutas al contrato
      await theContrato.related('rutas').saveMany(rutas);

      const email = {
        subject: "Nuevo contrato!",
        recipient: userResponse.data.email, // Correo del destinatario
        body_html: `<p>Nuevo contrato generado. Fecha de generacion: ${payload.fecha}, 
        distancia total ${payload.distancia_total}, costo total ${payload.costo_total}. Informacion de la ruta
        ${rutas}</p>`
      };

      // Enviar el correo al conductor
      const responseEmail = await axios.post(`${Env.get('MS_NOTIFICACIONES')}/send-email`, email, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(responseEmail);


      // Crear el contrato
      

      

      return theContrato;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
      
  } catch (error) {
    // Si el error es de validación, devolver los mensajes de error de forma legible
    /* if (error.messages) {
      return response.badRequest({ errors: error.messages.errors });
    } */
    // Para cualquier otro tipo de error, lanzar una excepción genérica
    throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
  }

  // Método para actualizar un Contrato
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con ContratoValidator
      payload = await request.validate(ContratoValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    const fecha = payload.fecha.toJSDate();
    // Obtener el Contrato y actualizar los datos
    const theContrato = await Contrato.findOrFail(params.id);
    theContrato.fecha = fecha;
    theContrato.distancia_total = payload.distancia_total;
    theContrato.costo_total= payload.costo_total;
    theContrato.cliente_id= payload.cliente_id;
    return await theContrato.save();
  }

  // Método para eliminar un Contrato
  public async delete({ params, response }: HttpContextContract) {
    const theContrato = await Contrato.findOrFail(params.id);
    response.status(204);
    return await theContrato.delete();
  }

  // Método para actualizar únicamente las coordenadas de un Contrato
  public async updateCoordinates({ params, request, response }: HttpContextContract) {
    try {
      // Validar que la solicitud solo contenga longitude y latitude
      const { longitude, latitude } = request.only(['longitude', 'latitude']);

      // Validar que latitude y longitude no estén vacíos
      if (longitude === undefined || latitude === undefined) {
        return response.badRequest({ message: 'Longitude y latitude son obligatorios' });
      }

      // Validar que sean números válidos
      const longitudeNum = parseFloat(longitude);
      const latitudeNum = parseFloat(latitude);

      if (isNaN(longitudeNum) || isNaN(latitudeNum)) {
        return response.badRequest({ message: 'Longitude y latitude deben ser números válidos' });
      }

      // Validar rangos de longitud y latitud
      if (latitudeNum < -90 || latitudeNum > 90) {
        return response.badRequest({ message: 'Latitude debe estar entre -90 y 90 grados' });
      }

      if (longitudeNum < -180 || longitudeNum > 180) {
        return response.badRequest({ message: 'Longitude debe estar entre -180 y 180 grados' });
      }

      // Buscar el contrato por ID
      const contrato = await Contrato.findOrFail(params.id);

      // Actualizar solo los campos longitude y latitude
      contrato.merge({ longitude: longitudeNum, latitude: latitudeNum });

      // Guardar cambios en la base de datos
      await contrato.save();

      console.log(contrato.latitude, contrato.longitude);

      // Emitir evento en un canal específico para el contrato
      Ws.io.emit(`coordinates/${contrato.id}`, {
        id: contrato.id,
        longitude,
        latitude,
      })
      

      // Responder con los datos actualizados
      return response.ok({ message: 'Coordenadas actualizadas correctamente', contrato });
      
    } catch (error) {
      // Manejar errores, incluyendo si el contrato no se encuentra
      throw new Exception(error.message || 'Error al actualizar las coordenadas', error.status || 500);
    }
  }

}
