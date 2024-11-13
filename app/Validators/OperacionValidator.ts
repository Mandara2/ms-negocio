import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperacionValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    fecha_inicio: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    fecha_fin: schema.date({
      format: 'yyyy-MM-dd'
    }),
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), rules.required() 
    ]),
    municipio_id: schema.number([
      rules.exists({ table: 'municipios', column: 'id' }), rules.required() 
    ])
  })

  
  public messages: CustomMessages = {
    'fecha_inicio.date.format': 'El campo fecha inicio debe tener el formato yyyy-MM-dd',
    'fecha_inicio.required': 'El campo fecha inicio es obligatorio',
    'fecha_fin.date.format': 'El campo fecha fin debe tener el formato yyyy-MM-dd',
    'fecha_fin.required': 'El campo fecha fin es obligatorio',
    'vehiculo_id.exists': 'El vehiculo debe de existir en la base de datos',
    'vehiculo_id.required': 'El campo vehiculo id es obligatorio',
    'municipio_id.exists': 'El municipio debe de existir en la base de datos',
    'municipio_id.required': 'El campo municipio id es obligatorio'
    
  }
}
