import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriaValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({

    nombre:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    descripcion:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    categoria_padre: schema.number([
      rules.exists({ table: 'categorias_productos', column: 'id' }), rules.required() 
    ])

  })


  public messages: CustomMessages = {}
}
