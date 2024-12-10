import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruta from 'App/Models/Ruta';
import { Exception } from '@adonisjs/core/build/standalone';
import RutaValidator from 'App/Validators/RutaValidator'; // Importar el validador
import { DateTime } from 'luxon';

export default class RutasController {
  // Método de búsqueda
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        const theRuta = await Ruta.findOrFail(params.id);
        await theRuta.load('contrato');
        await theRuta.load('vehiculoConductor');

        // Formatear fechas antes de devolver
        return {
          ...theRuta.toJSON(),
          fecha_entrega: DateTime.fromJSDate(theRuta.fecha_entrega).toFormat('yyyy-MM-dd'),
        };
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input('page', 1);
          const perPage = request.input("per_page", 20);

          // Obtener datos paginados
          const paginatedRutas = await Ruta.query().paginate(page, perPage);

          // Formatear fechas después de obtener los datos
          const formattedRutas = paginatedRutas.toJSON();
          formattedRutas.data = formattedRutas.data.map(Ruta => ({
            ...Ruta,
            fecha_entrega: DateTime.fromJSDate(new Date(Ruta.fecha_entrega)).toFormat('yyyy-MM-dd'),
          }));

          return formattedRutas;
        } else {
          // Consultar todos los Rutas y formatear fechas
          const Rutas = await Ruta.query();
          return Rutas.map(Ruta => ({
            ...Ruta.toJSON(),
            fecha_entrega: DateTime.fromJSDate(new Date(Ruta.fecha_entrega)).toFormat('yyyy-MM-dd'),
          }));
        }
      }
    } catch (error) {
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para crear un Ruta
  public async create({ request, response }: HttpContextContract) {
    try {
      // Validar datos usando el RutaValidator
      const payload = await request.validate(RutaValidator);

      const fecha_entrega = payload.fecha_entrega.toJSDate();
      
      const theRuta = await Ruta.create({
        ...payload,
        fecha_entrega: fecha_entrega
      });
      return theRuta;
      
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Para cualquier otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }
  }

  // Método para actualizar un Ruta
  public async update({ params, request, response }: HttpContextContract) {
    let payload;

    try {
      // Validar los datos con RutaValidator
      payload = await request.validate(RutaValidator);
    } catch (error) {
      // Si el error es de validación, devolver los mensajes de error de forma legible
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      // Si es otro tipo de error, lanzar una excepción genérica
      throw new Exception(error.message || 'Error al procesar la solicitud', error.status || 500);
    }

    const fecha_entrega = payload.fecha_entrega.toJSDate();
    // Obtener el Ruta y actualizar los datos
    const theRuta = await Ruta.findOrFail(params.id);
    theRuta.punto_inicio= payload.punto_inicio;
    theRuta.punto_destino = payload.punto_destino;
    theRuta.fecha_entrega= fecha_entrega;
    theRuta.contrato_id= payload.contrato_id;
    theRuta.vehiculo_conductor_id= payload.vehiculo_conductor_id;

    return await theRuta.save();
  }

  // Método para eliminar un Ruta
  public async delete({ params, response }: HttpContextContract) {
    const theRuta = await Ruta.findOrFail(params.id);
    response.status(204);
    return await theRuta.delete();
  }

  // Método para encontrar rutas por contrato_id
public async findRutaByContratoId({ params, response }: HttpContextContract) {
  try {
    const { contrato_id } = params;

    // Verifica que el contrato_id exista
    if (!contrato_id) {
      return response.badRequest({ error: 'El parámetro contrato_id es obligatorio.' });
    }

    // Busca las rutas asociadas al contrato_id, con optimización en la consulta
    const rutas = await Ruta.query().where('contrato_id', contrato_id).preload('contrato').preload('vehiculoConductor');
    
    // Verifica si hay resultados
    if (rutas.length === 0) {
      return response.notFound({ message: `No se encontraron rutas con contrato_id: ${contrato_id}` });
    }

    // Retorna las rutas encontradas
    return rutas;
  } catch (error) {
    // Manejo de excepciones mejorado
    throw new Exception(
      error.message || 'Error al buscar rutas por contrato_id',
      error.status || 500
    );
  }
}


}
