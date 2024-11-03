import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CentroDistribucionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    capacidadAlmacenamiento: schema.number([rules.unsigned()]),
    direccion_id: schema.number([
      rules.exists({ table: 'direccion', column: 'id' }), rules.required() 
    ])
  })



  public messages: CustomMessages = {}
}
