import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmpresaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    telefono: schema.string([
      rules.required(),
      rules.regex(/^[0-9-]+$/) // Solo permite números y guiones
    ]),
    tipo_empresa:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),

    direccion_fiscal:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    })]),
    cliente_id: schema.number([
      rules.exists({ table: 'cliente', column: 'id' })
    ]),

    persona_natural_id: schema.number([
      rules.exists({ table: 'personaNatural', column: 'id' }) 
    ])
  })


  public messages: CustomMessages = {
    'telefono.required': 'El campo telefono es obligatorio',
    'telefono.regex': 'El campo telefono solo acepta numeros y guiones',
    'tipo_empresa.alphaNum': 'El campo tipoEmpresa solo acepta como caracteres especiales el espacio, el guion bajo y medio',
    'tipo_empresa.required': 'El campo tipoEmpresa es obligatorio',
    'direccion_fiscal': 'El campo direccionFiscal solo acepta como caracteres especiales el espacio, el guion bajo y medio',
    'cliente_id.exists': 'El cliente_id debe existir en la base de datos',
    'persona_natural_id.exists': 'La personaNatural_id debe existir en la base de datos'
  }
}
