import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RutaValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    punto_inicio: schema.string([
      rules.regex(/^[a-zA-Z0-9 _\-#]+$/), // Permite letras, números, espacios, guiones bajos, guiones y '#'
      rules.required()
    ]),
    punto_destino: schema.string([
      rules.regex(/^[a-zA-Z0-9 _\-#]+$/), // Permite letras, números, espacios, guiones bajos, guiones y '#'
      rules.required()
    ]),
    distancia: schema.number([rules.unsigned(), rules.required()]),
    fecha_entrega: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    contrato_id: schema.number([
      rules.exists({ table: 'contratos', column: 'id' }), rules.required() 
    ]),
    vehiculo_conductor_id: schema.number([
      rules.exists({ table: 'vehiculos_conductores', column: 'id' }), rules.required() 
    ])
  })

  
  public messages: CustomMessages = {}
}
