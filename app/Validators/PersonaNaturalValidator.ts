import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PersonaNaturalValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    identificacion: schema.string([
      rules.regex(/^[0-9]+$/), // Solo permite dígitos del 0 al 9
      rules.required()
    ]),
    tipo_documento: schema.enum(
      ['Cedula', 'Pasaporte', 'Cedula Extranjera'] as const, [
        rules.required()
      ] // Limita las opciones a estas tres
    ),
    fecha_nacimiento: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ])
  })

 
  public messages: CustomMessages = {
    'identificacion.regex': 'El campo identificacion solo acepta numeros',
    'identificacion.required': 'El campo identificacion es obligatorio',
    'tipo_docuento.enum': 'El tipo de documento debe ser uno de los siguientes: Cedula, Pasaporte, Cedula Extranjera',
    'tipo_documento.required': 'El campo tipoDocumento es obligatorio',
    'fecha_nacimiento.date.format': 'El campo fechaNacimiento debe estar en formato yyyy-MM-dd',
    'fecha_nacimiento.required': 'El campo fechaNacimiento es obligatorio'
  }
}
