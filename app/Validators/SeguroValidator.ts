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
    comapania_aseguradora:schema.string([rules.alphaNum({
      allow: ['space']
    })]),
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {}
}
