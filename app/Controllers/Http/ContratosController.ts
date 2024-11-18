import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contrato from 'App/Models/Contrato';
import { Exception } from '@adonisjs/core/build/standalone';
import ContratoValidator from 'App/Validators/ContratoValidator'; // Importar el validador
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import Cliente from 'App/Models/Cliente';

export default class ContratosController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    let theContrato;

    try {
      if (params.id) {
        theContrato = await Contrato.findOrFail(params.id);
        await theContrato.load('cliente');
        return theContrato;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);
          return await Contrato.query().paginate(page, perPage);
        } else {
          return await Contrato.query();
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
      
      const cliente = await Cliente.find(payload.cliente_id);
      console.log(cliente?.usuario_id);

      if (!cliente) {
        throw new Exception("No se puedo encontrar al cliente")
      }
      
      //const usuarioId = cliente.usuario;

      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${cliente.usuario_id}`, {
        headers: { Authorization: request.headers().authorization || '' }
      });

      console.log("Este es el userResponse");
      console.log(userResponse.data.email);

       const email = {
        subject: "Nuevo contrato!",
      recipient: userResponse.data.email, // Cambia esto por el correo del destinatario
      body_html: `<p>Nuevo contrato generado. Fecha de generacion: ${payload.fecha}, 
      distancia total ${payload.distancia_total}, costo total ${payload.costo_total}.</p>`
      }

      // Envio el correo al momento de crear el contrato al conductor
      const responseEmail = await axios.post(`${Env.get('MS_NOTIFICACIONES')}/send-email`, email, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(responseEmail);
      
      
      

      // Convertir fecha_nacimiento a Date
      const fecha = payload.fecha.toJSDate();

     

      const theContrato = await Contrato.create({
        ...payload,
        fecha: fecha
      });
      


      return theContrato;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
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
}
