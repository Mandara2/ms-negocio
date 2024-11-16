import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TurnoValidator {
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
    
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' }), rules.required() 
    ])
  })

  
  public messages: CustomMessages = {
    'fecha_inicio.date.format': 'El campo fecha inicio debe seguir el formato de yyyy-MM-dd HH:mm:ss', 
    'fecha_inicio.required': 'El campo fecha inicio es obligatorio',
    'fecha_fin.date.format': 'El campo fecha fin debe seguir el formato de yyyy-MM-dd HH:mm:ss', 
    'fecha_fin.required': 'El campo fecha fin es obligatorio',
    'conductor_id.exists': 'El conductor debe existir en la base de datos',
    'conductor_id.required': 'El campo conductor id id es obligatorio'
  }
}
