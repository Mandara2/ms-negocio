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

  
  public messages: CustomMessages = {
    'punto_inicio.regex': 'El campo punto inicio solo puede contener letras, numeros, espacios, guiones bajos o medios y numerales', 
    'punto_inicio.required': 'El campo punto inicio es obligatorio', 
    'punto_fin.regex': 'El campo punto fin solo puede contener letras, numeros, espacios, guiones bajos o medios y numerales', 
    'punto_fin.required': 'El campo punto fin es obligatorio', 
    'distancia.unsigned': 'El campo distancia no puede ser negativo',
    'distancia.required': 'El campo distancia es obligatorio',
     'fecha_entrega.date.format': 'El campo fecha entrega debe seguir el formato de yyyy-MM-dd', 
    'fecha_entrega.required': 'El campo fecha entrega es obligatorio',
     'contrato_id.exists': 'El contrato debe existir en la base de datos',
      'contrato_id.required': 'El campo contrato id es obligatorio', 
    'vehiculo_conductor_id.exists': 'El vehiculo conductor id debe existir en la base de datos',
      'vehiculo_conductor_id.required': 'El camvehiculo conductor id id es obligatorio', 
  }
}
