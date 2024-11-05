import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CentroDistribucionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    capacidad_almacenamiento: schema.number([rules.unsigned(),rules.regex(/^[0-9]+$/),]),
    direccion_id: schema.number([
      rules.exists({ table: 'direccion', column: 'id' }), rules.required() 
    ])
  })



  public messages: CustomMessages = {
    'nombre.alphaNum': 'El campo nombre solo acepta como caracter especial es espacio',
    'nombre.required': 'El campo nombre es obligatorio',
    'capacidad_almacenamiento.unsigned': 'La capacidad de almacenamiento no puede ser negativa' ,
    'capacidad_almacenamiento.required': 'El campo capacidadAlmacenamiento es obligatorio',
    'capacidad_almacenamiento.regex': 'El campo capacidadAlmacenamiento solo acepta numeros',
    'direccion_id.exists':'La direccion debe existir en la base de datos',
    'direccion_id.required': 'El campo direccion_id es obligatorio'
  }
}
