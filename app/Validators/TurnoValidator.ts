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

  
  public messages: CustomMessages = {}
}
