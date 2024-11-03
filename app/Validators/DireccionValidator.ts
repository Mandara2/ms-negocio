import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DireccioneValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    localidad:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),
    tipoDireccion: schema.enum(
      ['Avenida', 'Av. Calle', 'Av. Carrera', 'Av. Diagonal', 'Calle', 'Carrera', 'Circular', 'Circunvalar', 'Diagonal', 'Manzana', 'Transversal', 'Via'] as const, [
        rules.required()
      ]
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
    'localidad.alphaNum': 'El campo localidad solo acepta como caracteres especiales espacio, guion bajo y medio',
    'localidad.required': 'El campo localidad es obligatorio',
    'tipoDireccion.enum': 'El tipo de direccion debe ser alguno de los siguientes: Avenida, Av. Calle, Av. Carrera, Av. Diagonal, Calle, Carrera, Circular, Circunvalar, Diagonal, Manzana, Transversal, Via',
    'tipoDireccion.required': 'El campo tipoDireccion es obligatorio',
    'calle.alphaNum': 'El campo calle solo acepta caracteres especiales como espacio, guiones bajos y medios',
    'calle.required': 'El campo calle es obligatorio',
    'numeroDireccion.alphaNum': 'El campo numeroDireccion solo acepta como caracteres especiales espacio, guiones bajos y medios',
    'numeroDireccion.required': 'El campo numeroDireccion es obligatorio',
    'referencias.alphaNum': 'El campo referencias solo acepta como caracteres especiales espacio, guiones bajos y medios',
    'municipio_id.exists': 'El municipio_id debe existir en la base de datos'
  }
}
