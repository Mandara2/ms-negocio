import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    monto: schema.number([rules.unsigned(), rules.required()]),
    interes: schema.number([rules.unsigned(), rules.required()]),
    numero: schema.number([rules.unsigned(), rules.required()]),
    contrato_id: schema.number([
      rules.exists({ table: 'contratos', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {
    'monto.required': 'El campo monto es obligatorio',
    'monto.unsigned': 'El campo monto no puede ser negativo',
    'intereses.required': 'El campo intereses es obligatorio',
    'intereses.unsigned': 'El campo intereses no puede ser negativo',
    'numero.required': 'El campo numero es obligatorio',
    'numero.unsigned': 'El campo numero no puede ser negativo',
    'contrato_id.required': 'El campo contrato es obligatorio',
    'contrato_id.exist': 'El contrato debe existir en la base de datos ',
  }
}
