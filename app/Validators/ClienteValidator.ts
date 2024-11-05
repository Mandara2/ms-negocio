import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    telefono: schema.string([
      rules.required(),
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ]),
    cantidad_pedidos_realizados: schema.number([  //Realmente se debe poner este atributo?????
      rules.unsigned()
    ])
  })

 
  public messages: CustomMessages = {
    'telefono.required': 'El campo telefono es obligatorio',
    'telefono.regex': 'El campo telefono solo puede contener numeros y guiones',
    'cantidad_pedidos_realizados.unsigned': 'El campo cantidadPedidosRealizados no puede ser negativo' 
  }
}
