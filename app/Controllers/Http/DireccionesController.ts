import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Direccion from 'App/Models/Direccion';

export default class DireccionesController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDireccion: Direccion = await Direccion.findOrFail(params.id)
            await theDireccion.load("municipio")
            await theDireccion.load('centrosDistribucion')
            return theDireccion;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Direccion.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await Direccion.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const theDireccion: Direccion = await Direccion.create(body);
        return theDireccion;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDireccion: Direccion = await Direccion.findOrFail(params.id);
        const body = request.body();
        theDireccion.localidad = body.localidad;
        theDireccion.tipoDireccion = body.tipoDireccion;
        theDireccion.calle = body.calle;
        theDireccion.numeroDireccion = body.numeroDireccion;
        theDireccion.referencias = body.referencias;
        theDireccion.municipio_id = body.municipio_id;
        return await theDireccion.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDireccion: Direccion = await Direccion.findOrFail(params.id);
            response.status(204);
            return await theDireccion.delete();
    }
}

