import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class DireccionSeeder extends BaseSeeder {
  public async run () {
    // Creamos las direcciones y asignamos el `municipio_id` correspondiente
    await Database.table('direcciones').insert([
      {
        id: 1,
        localidad: 'El Poblado',
        tipo_direccion: 'Residencial',
        calle: 'Cra 43A',
        numero_direccion: '25-50',
        referencias: 'Cerca al parque Lleras',
        municipio_id: 1,
      },
      {
        id: 2,
        localidad: 'Ciudad Jardín',
        tipo_direccion: 'Comercial',
        calle: 'Calle 15',
        numero_direccion: '80_d60',
        referencias: 'Frente al centro comercial',
        municipio_id: 2
      },
      {
        id: 3,
        localidad: 'El Prado',
        tipo_direccion: 'Residencial',
        calle: 'Calle 72',
        numero_direccion: '15-45',
        referencias: 'Cerca al colegio Distrital',
        municipio_id: 3
      },
      {
        id: 4,
        localidad: 'Laureles',
        tipo_direccion: 'Residencial',
        calle: 'Cra 70',
        numero_direccion: '45-23',
        referencias: 'Cerca a la segunda parque',
        municipio_id: 4
      },
      {
        id: 5,
        localidad: 'San Fernando',
        tipo_direccion: 'Comercial',
        calle: 'Av Roosevelt',
        numero_direccion: '32-12',
        referencias: 'Al lado del hospital departamental',
        municipio_id: 5
      },
    ])
  }
}
