import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dueno from 'App/Models/Dueno';

export default class DuenosController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDueno: Dueno = await Dueno.findOrFail(params.id)
            return theDueno;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Dueno.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await Dueno.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const theDueno: Dueno = await Dueno.create(body);
        return theDueno;
    }

    public async update({ params, request }: HttpContextContract) {
        const theDueno: Dueno = await Dueno.findOrFail(params.id);
        const body = request.body();
        theDueno.telefono = body.telefono;
        theDueno.fechaNacimiento = body.fechaNacimiento;
        theDueno.conductor_id = body.conductor_id;
        return await theDueno.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDueno: Dueno = await Dueno.findOrFail(params.id);
            response.status(204);
            return await theDueno.delete();
    }
}

