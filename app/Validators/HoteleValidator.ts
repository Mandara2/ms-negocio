import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HoteleValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    estrellas: schema.number([
      rules.unsigned(),
      rules.required(),
      rules.range(0, 5),
    ]),
    nombre:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    ubicacion:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' })
    ]),
  })

  
  public messages: CustomMessages = {}
}
