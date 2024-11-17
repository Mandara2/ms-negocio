import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriasProductoValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    producto_id: schema.number([
      rules.exists({ table: 'productos', column: 'id' })
    ]),
    categoria_id: schema.number([
      rules.exists({ table: 'categorias', column: 'id' })
    ]),
    detalle:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()])

  })

  
  public messages: CustomMessages = {}
}
