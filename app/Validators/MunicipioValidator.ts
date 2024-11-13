import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MunicipioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    codigo_postal: schema.string([rules.required(), rules.regex(/^[0-9]+$/)]),  // Asegura que el string contenga solo números
    departamento_id: schema.number([
      rules.exists({ table: 'departamentos', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del municipio es obligatorio',
    'nombre.alphaNum': 'El nombre no debe contener caracteres especiales',
    'codigo_postal.regex': 'El codigo postal solo debe contener numeros',
    'codigo_postal.required': 'El codigo postal es obligatorio',
    'departamento_id.required': 'El codigo del departamento es obligatorio',
    'departamento_id.exists': 'El departamento debe existir'
  }
}
