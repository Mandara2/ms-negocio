import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    peso: schema.number([rules.unsigned(), rules.required()]),
    volumen: schema.number([rules.unsigned(), rules.required()]),
    dir_lista_orden_id: schema.number([
      rules.exists({ table: 'dir_lista_ordenes', column: 'id' }), rules.required() 
    ])
  })

  
  public messages: CustomMessages = {}
}
