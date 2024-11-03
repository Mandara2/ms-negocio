import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PersonaNaturalValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    identificacion: schema.string([
      rules.regex(/^[0-9]+$/), // Solo permite dígitos del 0 al 9
      rules.required()
    ]),
    tipoDocumento: schema.enum(
      ['Cedula', 'Pasaporte', 'Cedula Extranjera'] as const // Limita las opciones a estas tres
    ),
    fechaNacimiento: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ])
  })

 
  public messages: CustomMessages = {}
}
