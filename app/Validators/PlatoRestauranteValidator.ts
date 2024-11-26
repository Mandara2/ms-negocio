import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlatoRestauranteValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    restaurante_id: schema.number([
      rules.exists({ table: 'restaurantes', column: 'id' }), rules.required() 
    ]),
    plato_id: schema.number([
      rules.exists({ table: 'platos', column: 'id' }), rules.required() 
    ]),
    precio: schema.number([rules.unsigned(), rules.required()]),

  })

  
  public messages: CustomMessages = {}
}
