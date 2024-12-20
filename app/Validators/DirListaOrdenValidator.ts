import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DirListaOrdenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    orden: schema.number([rules.unsigned(), rules.required()]),
    descripcion:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    })]),
    ruta_id: schema.number([
      rules.exists({ table: 'rutas', column: 'id' }), rules.required() 
    ]),
    direccion_id: schema.number([
      rules.exists({ table: 'direcciones', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {
    'orden.required': 'El campo orden es obligatorio',
    'orden.unsigned': 'El campo orden no puede ser negativo',
    'descripcion.alphaNum': 'El campo descripcion solo acepta como caracteres especiales el espacio, el guion bajo y medio',
    'descripcion.required': 'El campo descripcion es obligatorio',
    'ruta_id.required': 'El campo ruta es obligatorio',
    'ruta_id.exists': 'La ruta debe existir en la base de datos ',
    'direccion_id.required': 'El campo direccion es obligatorio',
    'direccion_id.exists': 'La direccion debe existir en la base de datos'
  }
}
