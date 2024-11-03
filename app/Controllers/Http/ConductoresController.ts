import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductores from 'App/Models/Conductor';

export default class ConductoresController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theConductor: Conductores = await Conductores.findOrFail(params.id)
            return theConductor;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Conductores.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await Conductores.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const theConductor: Conductores = await Conductores.create(body);
        return theConductor;
    }

    public async update({ params, request }: HttpContextContract) {
        const theConductor: Conductores = await Conductores.findOrFail(params.id);
        const body = request.body();
        theConductor.telefono = body.telefono;
        theConductor.fechaNacimiento = body.fechaNacimiento
        theConductor.numeroLicencia = body.numeroLicencia;
        theConductor.fechaVencimientoLicencia = body.fechaVencimientoLicencia;
        return await theConductor.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theConductor: Conductores = await Conductores.findOrFail(params.id);
            response.status(204);
            return await theConductor.delete();
    }
}

