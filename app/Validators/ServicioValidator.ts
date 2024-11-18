import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicioValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    fecha: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    descripcion:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),
    administrador_id: schema.number([
      rules.exists({ table: 'administradores', column: 'id' }) 
    ])
  })

 
  public messages: CustomMessages = {}
}
