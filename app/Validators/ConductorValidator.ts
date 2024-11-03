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
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    fechaVencimientoLicencia: schema.date({
        format: 'yyyy-MM-dd'
      }, [
        rules.required() // Hace que el campo sea obligatorio
      ]),
  })

  public messages: CustomMessages = {
    'telefono.required': 'El campo telefono es obligatorio',
    'telefono.regex': 'El campo telefono solo acepta numeros y guiones',
    'numeroLicencia.required': 'El campo numeroLicencia es obligatorio',
    'numeroLicencia.regex': 'El campo numeroLicencia solo acepta numeros',
    'fechaNacimiento.date.format': 'La fechaNacimiento debe estar en formato yyyy-MM-dd',
    'fechaVencimientoLicencia.date.format': 'La fechaVencimientoLicencia debe estar en formato yyyy-MM-dd'
  }
}
