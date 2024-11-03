import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio';

export default class MunicipiosController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMunicipio: Municipio = await Municipio.findOrFail(params.id)
            await theMunicipio.load("departamento")
            await theMunicipio.load('direcciones')
            return theMunicipio;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Municipio.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await Municipio.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const theMunicipio: Municipio = await Municipio.create(body);
        return theMunicipio;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
        const body = request.body();
        theMunicipio.nombre = body.nombre;
        theMunicipio.codigoPostal = body.codigoPostal;
        theMunicipio.departamento_id = body.departamento_id;
        return await theMunicipio.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
            response.status(204);
            return await theMunicipio.delete();
    }
}

