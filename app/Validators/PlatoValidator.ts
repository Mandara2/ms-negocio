import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlatoValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({
    nombre:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),
    descripcion:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    })]),
  })

  
  public messages: CustomMessages = {}
}
