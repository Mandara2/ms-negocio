import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductoValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    nombre:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    fecha_vencimiento: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    cliente_id: schema.number([
      rules.exists({ table: 'clientes', column: 'id' })
    ]),
  lote_id: schema.number([
      rules.exists({ table: 'lotes', column: 'id' })
    ])
  })

  
  public messages: CustomMessages = {}
}
