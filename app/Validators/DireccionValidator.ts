import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DireccioneValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    localidad:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),
    tipoDireccion: schema.enum(
      ['Avenida', 'Av. Calle', 'Av. Carrera', 'Av. Diagonal', 'Calle', 'Carrera', 'Circular', 'Circunvalar', 'Diagonal', 'Manzana', 'Transversal', 'Via'] as const // Limita las opciones a estas tres
    ),
    calle:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),

    numeroDireccion:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),

    referencias:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    })]),
    municipio_id: schema.number([
      rules.exists({ table: 'municipio', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {
    
  }
}
