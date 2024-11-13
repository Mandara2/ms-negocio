import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehiculoValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    matricula:schema.string([rules.alphaNum({
      allow: ['dash']
    }), rules.required()]),
    modelo:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    capacidad_carga: schema.number([rules.unsigned(), rules.required()]),
    tipo_carga:schema.string([rules.alphaNum({
      allow: ['space', 'dash']
    }), rules.required()]),
  })

  
  public messages: CustomMessages = {
    'matricula.alphaNum': 'El campo matricula solo admite como caracter especial el guion ',
    'matricula.required': 'El campo matricula es obligatorio',
    'modelo.required': 'El campo modelo es obligatorio', 
    'modelo.alphaNum': 'El campo modelo solo admite como caracter especial el espacio', 
    'capacidad_carga.unsigned': 'El campo capacidad de carga no puede ser negativo',
    'capacidad_carga.required': 'El campo capacidad de carga es obligatorio',
    'tipo_carga.alphaNum': 'El campo tipo de carga solo admite como caracteres especiales el espacio y el guion',
    'tipo_carga.required': 'El campo tipo de carga es obligatorio'
  }
}
