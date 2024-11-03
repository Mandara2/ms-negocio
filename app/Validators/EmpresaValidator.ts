import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmpresaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    telefono: schema.string([
      rules.required(),
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ]),
    tipoEmpresa:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),

    direccionFiscal:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),

    cliente_id: schema.number([
      rules.exists({ table: 'cliente', column: 'id' })
    ]),

    personaNatural_id: schema.number([
      rules.exists({ table: 'personaNatural', column: 'id' }) 
    ])
  })


  public messages: CustomMessages = {}
}
