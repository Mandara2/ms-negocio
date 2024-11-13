import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SeguroValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({
    fecha_inicio: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    fecha_fin: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    compania_aseguradora:schema.string([rules.alphaNum({
      allow: ['space']
    })]),
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {
    'fecha_inicio.date.format': 'El campo fecha inicio debe seguir el formato de yyyy-MM-dd', 
    'fecha_inicio.required': 'El campo fecha inicio es obligatorio',
    'fecha_fin.date.format': 'El campo fecha fin debe seguir el formato de yyyy-MM-dd', 
    'fecha_fin.required': 'El campo fecha fin es obligatorio',
    'compania_aseguradora': 'El campo compania aseguradora solo admite como caracter especial es espacio',
    'vehiculo_id.exists': 'El vehiculo debe existir en la base de datos',
      'vehiculo_id.required': 'El campo vehiculo id id es obligatorio',
  }
}
