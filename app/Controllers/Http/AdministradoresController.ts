import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrador from 'App/Models/Administrador';

export default class AdministradoresController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theAdministrador: Administrador = await Administrador.findOrFail(params.id)
            return theAdministrador;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Administrador.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await Administrador.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const theAdministrador: Administrador = await Administrador.create(body);
        return theAdministrador;
    }

    public async update({ params, request }: HttpContextContract) {
        const theAdministrador: Administrador = await Administrador.findOrFail(params.id);
        const body = request.body();
        theAdministrador.tipo = body.tipo;
        theAdministrador.telefono = body.telefono;
        return await theAdministrador.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAdministrador: Administrador = await Administrador.findOrFail(params.id);
            response.status(204);
            return await theAdministrador.delete();
    }
}

