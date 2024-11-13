import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DuenoVehiculoValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    fecha_adquisicion: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    porcentaje_propiedad: schema.number([rules.unsigned(), rules.required()]),
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), rules.required() 
    ]),
    dueno_id: schema.number([
      rules.exists({ table: 'duenos', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {
    'fecha_adquisicion.date.format': 'La fecha de adquisicion debe tener el formato yyyy-MM-dd',
    'fecha_adquisicion.required': 'El campo fecha de adquisicion es obligatorio',
    'porcentaje_propiedad.unsigned': 'El campo porcentaje de propiedad no puede ser negativo',
    'porcentaje_propiedad.required': 'El campo porcentaje de propiedad es obligatorio',
    'vehiculo_id.exists': 'El vehiculo debe existir en la base de datos',
    'vehiculo_id.required': 'El campo vehiculo id es obligatorio',
    'dueno_id.exists': 'El dueno debe existir en la base de datos',
    'dueno_id.required': 'El campo dueno id es obligatorio'
  }
}
