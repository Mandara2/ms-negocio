import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Direccion from 'App/Models/Direccion'
import Municipio from 'App/Models/Municipio'

export default class DireccionSeeder extends BaseSeeder {
  public async run () {
    // Recuperamos algunos municipios existentes
    const medellin = await Municipio.findBy('nombre', 'Medellín')
    const cali = await Municipio.findBy('nombre', 'Cali')
    const barranquilla = await Municipio.findBy('nombre', 'Barranquilla')

    // Creamos las direcciones y asignamos el `municipio_id` correspondiente
    await Direccion.createMany([
      {
        localidad: 'El Poblado',
        tipoDireccion: 'Residencial',
        calle: 'Cra 43A',
        numeroDireccion: '25-50',
        referencias: 'Cerca al parque Lleras',
        municipio_id: medellin?.id!,
      },
      {
        localidad: 'Ciudad Jardín',
        tipoDireccion: 'Comercial',
        calle: 'Calle 15',
        numeroDireccion: '80-60',
        referencias: 'Frente al centro comercial',
        municipio_id: cali?.id!},
      {
        localidad: 'El Prado',
        tipoDireccion: 'Residencial',
        calle: 'Calle 72',
        numeroDireccion: '15-45',
        referencias: 'Cerca al colegio Distrital',
        municipio_id: barranquilla?.id!,
      },
      {
        localidad: 'Laureles',
        tipoDireccion: 'Residencial',
        calle: 'Cra 70',
        numeroDireccion: '45-23',
        referencias: 'Cerca a la segunda parque',
        municipio_id: medellin?.id!,
      },
      {
        localidad: 'San Fernando',
        tipoDireccion: 'Comercial',
        calle: 'Av Roosevelt',
        numeroDireccion: '32-12',
        referencias: 'Al lado del hospital departamental',
        municipio_id: cali?.id!},
    ])
  }
}
