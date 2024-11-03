import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DuenoValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({
    telefono: schema.string([
      rules.required(),
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ]),
      fechaNacimiento: schema.date({
        format: 'yyyy-MM-dd'
      }, [
        rules.required() // Hace que el campo sea obligatorio
      ]),
    conductor_id: schema.number([
      rules.exists({ table: 'conductor', column: 'id' })
    ])
  })

  
  public messages: CustomMessages = {
    'telfono.required': 'El campo telefono es obligatorio',
    'telefono.regex': 'El campo telefono solo acepta numeros y guiones',
    'fechaNacimiento.date.format': 'La fechaNacimiento debe estar en formato yyyy-MM-dd',
    'fechaNacimiento.required': 'La fecha de nacimiento es obligatoria',
    'conductor_id.exist': 'El conductor_id debe existir en la base de datos'
  }
}
