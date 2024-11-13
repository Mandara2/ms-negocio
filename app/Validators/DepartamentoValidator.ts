import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartamentoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    region:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()])
  })

  
  public messages: CustomMessages = {
    'nombre.required': 'El nombre del departamento es obligatorio',
    'nombre.alphaNum': 'El nombre no debe contener carcteres especiales',
    'region.required': 'El nombre de la region es obligatorio',
    'region.alphaNum': 'El nombre de la region no debe obtener caracteres especiales'
  }
}
