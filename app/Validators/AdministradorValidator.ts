import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministradorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tipo:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),
    telefono: schema.string([
      rules.required(),
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ])
  })

  
  public messages: CustomMessages = {
    'tipo.alphaNum': 'El tipo solo acepta espacios, guiones bajos y medios',
    'tipo.required': 'El campo tipo es obligatorio',
    'telefono.required': 'El campo telefono es obligatorio',
    'telefono.regex': 'El campo telefono solo acepta numeros y guiones'
  }
}
