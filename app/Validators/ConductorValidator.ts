import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    telefono: schema.string([
      rules.required(),
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ]),
    numeroLicencia: schema.string([
      rules.required(),
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ]),
    fechaNacimiento: schema.date({
      format: 'yyyy-MM-dd',
    }),
    fechaVencimientoLicencia: schema.date({
      format: 'yyyy-MM-dd',
    })
  })

  public messages: CustomMessages = {}
}
