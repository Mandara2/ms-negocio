import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GastoValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    detalles:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    })]),
    dueno_id: schema.number([
      rules.exists({ table: 'duenos', column: 'id' })
    ]),
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' })
    ]),
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' })
    ]),
  })

  
  public messages: CustomMessages = {}
}
