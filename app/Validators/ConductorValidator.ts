import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    telefono: schema.string([
      rules.required(),
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ]),
    numero_licencia: schema.string([
      rules.required(),
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ]),
    fecha_nacimiento: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    fecha_vencimiento_licencia: schema.date({
        format: 'yyyy-MM-dd'
      }, [
        rules.required() // Hace que el campo sea obligatorio
      ]),
    usuario_id: schema.string([
        rules.required(),
      ])
  })

  public messages: CustomMessages = {
    'telefono.required': 'El campo telefono es obligatorio',
    'telefono.regex': 'El campo telefono solo acepta numeros y guiones',
    'numero_licencia.required': 'El campo numeroLicencia es obligatorio',
    'numero_licencia.regex': 'El campo numeroLicencia solo acepta numeros',
    'fecha_nacimiento.date.format': 'La fechaNacimiento debe estar en formato yyyy-MM-dd',
    'fecha_vencimiento_licencia.date.format': 'La fechaVencimientoLicencia debe estar en formato yyyy-MM-dd',
    'usuario_id': 'El cmapo usuario es obligatorio'
  }
}
