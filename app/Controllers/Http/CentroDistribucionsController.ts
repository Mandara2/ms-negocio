import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CentroDistribucion from 'App/Models/CentroDistribucion';

export default class CentroDistribucionsController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCentroDistribucion: CentroDistribucion = await CentroDistribucion.findOrFail(params.id)
            //await theCentroDistribucion.load("direcciones")
            return theCentroDistribucion;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await CentroDistribucion.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await CentroDistribucion.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const theCentroDistribucion: CentroDistribucion = await CentroDistribucion.create(body);
        return theCentroDistribucion;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCentroDistribucion: CentroDistribucion = await CentroDistribucion.findOrFail(params.id);
        const body = request.body();
        theCentroDistribucion.nombre = body.nombre;
        theCentroDistribucion.capacidadAlmacenamiento = body.capacidadAlmacenamiento;
        theCentroDistribucion.direccion_id = body.direccion_id;
        return await theCentroDistribucion.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCentroDistribucion: CentroDistribucion = await CentroDistribucion.findOrFail(params.id);
            response.status(204);
            return await theCentroDistribucion.delete();
    }
}

