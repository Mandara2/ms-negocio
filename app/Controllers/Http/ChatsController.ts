import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor'
import Cliente from 'App/Models/Cliente'
import Dueno from 'App/Models/Dueno'
import Chat from 'App/Models/Chat'
import PersonaNatural from 'App/Models/PersonaNatural'

export default class ChatsController {
  // Buscar usuario por número telefónico en varias tablas
  public async buscarUsuario({ request, response }: HttpContextContract) {
    
    const telefono = request.input('telefono')

    // Buscar en conductores
    const conductor = await Conductor.query().where('telefono', telefono).first()
    if (conductor) {
      return response.ok({ success: true, tipo: 'conductor', usuario: conductor })
    }

    // Buscar en clientes
    const cliente = await Cliente.query().where('telefono', telefono).first()
    if (cliente) {
      return response.ok({ success: true, tipo: 'cliente', usuario: cliente })
    }

    // Buscar en dueños
    const dueno = await Dueno.query().where('telefono', telefono).first()
    if (dueno) {
      return response.ok({ success: true, tipo: 'dueno', usuario: dueno })
    }

    // Si no se encuentra en ninguna tabla
    return response.notFound({ success: false, message: 'Usuario no encontrado en ninguna tabla' })
  }

  public async obtenerMensajes({ request, response }: HttpContextContract) {
    console.log("si llegue");
    
    const telefono_remitente = request.input('telefono_remitente')
    const telefono_destinatario = request.input('telefono_destinatario')

    // Buscar los mensajes entre los usuarios
    const mensajes = await Chat.query()
      .where((query) => {
        query
          .where('telefono_remitente', telefono_remitente)
          .where('telefono_destinatario', telefono_destinatario)
          .orWhere('telefono_remitente', telefono_destinatario)
          .where('telefono_destinatario', telefono_remitente)
      })
      .orderBy('created_at', 'asc')

    return response.ok({ success: true, mensajes })
  }


  // Enviar mensaje usando número de teléfono del remitente
  public async enviarMensaje({ request, response }: HttpContextContract) {
    const { telefono_remitente, telefono_destinatario, contenido } = request.only([
      'telefono_remitente',
      'telefono_destinatario',
      'contenido',
    ])

    // Buscar remitente en conductores, clientes y dueños
    const remitente =
      (await Conductor.query().where('telefono', telefono_remitente).first()) ||
      (await Cliente.query().where('telefono', telefono_remitente).first()) ||
      (await Dueno.query().where('telefono', telefono_remitente).first())

    if (!remitente) {
      return response.notFound({ success: false, message: 'Remitente no encontrado' })
    }

    // Buscar destinatario en conductores, clientes y dueños
    const destinatario =
      (await Conductor.query().where('telefono', telefono_destinatario).first()) ||
      (await Cliente.query().where('telefono', telefono_destinatario).first()) ||
      (await Dueno.query().where('telefono', telefono_destinatario).first())

    if (!destinatario) {
      return response.notFound({ success: false, message: 'Destinatario no encontrado' })
    }

    // Crear el chat
    const chat = await Chat.create({
      telefono_remitente: remitente.telefono,
      telefono_destinatario: destinatario.telefono,
      contenido,
    })

    console.log("chat " + chat.contenido);
    

    return response.ok({ success: true, chat })
  }



public async obtenerTelefono({ request, response }: HttpContextContract) {
  const userId = request.param('id') // Suponiendo que el ID del usuario se pasa por la URL
  console.log("Llegué al método obtenerTelefono con ID:", userId)

  try {
    // Buscar en la tabla PersonasNaturales para obtener el cliente_id relacionado con el usuario_id
    const personaNatural = await PersonaNatural.query()
      .where('usuario_id', userId)
      .select('cliente_id')
      .first()

    if (personaNatural && personaNatural.cliente_id) {
      console.log("cliente_id obtenido de PersonasNaturales:", personaNatural.cliente_id)
      
      // Buscar el teléfono en la tabla Cliente usando cliente_id
      const cliente = await Cliente.query()
        .where('id', personaNatural.cliente_id)
        .select('telefono')
        .first()

      if (cliente && cliente.telefono) {
        console.log("Teléfono encontrado en Cliente:", cliente.telefono)
        return response.ok({ telefono: cliente.telefono })
      }
    }

    // Buscar en la tabla Conductor si no se encontró en Cliente
    const conductor = await Conductor.query().where('usuario_id', userId).first()
    if (conductor) {
      console.log("Teléfono encontrado en Conductor:", conductor.telefono)
      return response.ok({ telefono: conductor.telefono })
    }

    // Buscar en la tabla Dueno si no se encontró ni en Cliente ni en Conductor
    const dueno = await Dueno.query().where('usuario_id', userId).first()
    if (dueno) {
      console.log("Teléfono encontrado en Dueno:", dueno.telefono)
      return response.ok({ telefono: dueno.telefono })
    }

    // Si no se encontró el teléfono en ninguna tabla
    return response.notFound({ message: 'Usuario no encontrado' })
  } catch (error) {
    console.error('Error al obtener el teléfono:', error)
    return response.internalServerError({ message: 'Error interno del servidor' })
  }
}

}
