import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContratoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    distancia_total: schema.number([rules.unsigned(), rules.required()]),
    costo_total: schema.number([rules.unsigned(), rules.required()]),
    cliente_id: schema.number([
      rules.exists({ table: 'clientes', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {
    'fecha.required': 'El campo fecha es obligatorio',
    'fecha.date.format': 'La fecha debe estar en formato yyyy-MM-dd',
    'distancia_total.required': 'El campo distancia_total es obligatorio',
    'distancia_total.unsigned': 'El campo distancia_total no puede ser negativo',
    'costo_total.required': 'El campo costo_total es obligatorio',
    'costo_total.unsigned': 'El campo costo_total no puede ser negativo',
    'cliente_id.required': 'El campo cliente_id es obligatorio',
    'cliente_id.exist': 'El cliente debe existir en la base de datos ',
  }
}
