import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehiculoValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    matricula:schema.string([rules.alphaNum({
      allow: ['space', 'dash']
    })]),
    modelo:schema.string([rules.alphaNum({
      allow: ['space']
    })]),
    capacidad_carga: schema.number([rules.unsigned(), rules.required()]),
    tipo_carga:schema.string([rules.alphaNum({
      allow: ['space', 'dash']
    }), rules.required()]),
  })

  
  public messages: CustomMessages = {}
}
