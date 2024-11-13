import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    peso: schema.number([rules.unsigned(), rules.required()]),
    volumen: schema.number([rules.unsigned(), rules.required()]),
    dir_lista_orden_id: schema.number([
      rules.exists({ table: 'dir_lista_ordenes', column: 'id' }), rules.required() 
    ]),
    /* lote_id: schema.number([
      rules.exists({ table: 'lotes', column: 'id' }), rules.required() 
    ]) */
  })

  
  public messages: CustomMessages = {
    'peso.unsigned': 'El campo peso no debe ser negativo',
    'peso.required': 'El campo peso es obligatorio',
    'volumen.unsigned': 'El campo volumen no debe ser negativo',
    'volumen.required': 'El campo volumen es obligatorio',
    'dir_lista_orden_id.exists': 'El campo dir_lista_orden debe existir en la base de datos',
    'dir_lista_orden_id.required': 'El campo dir_lista_orden es obligatorio'
  }
}
