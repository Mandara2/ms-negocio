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

  public messages: CustomMessages = {}
}
