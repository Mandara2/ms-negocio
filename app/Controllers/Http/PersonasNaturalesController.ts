import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import personaNatural from 'App/Models/PersonaNatural';

export default class personasNaturalessController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thepersonaNatural: personaNatural = await personaNatural.findOrFail(params.id)
            await thepersonaNatural.load("cliente")
            return thepersonaNatural;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await personaNatural.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await personaNatural.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const thepersonaNatural: personaNatural = await personaNatural.create(body);
        return thepersonaNatural;
    }

    public async update({ params, request }: HttpContextContract) {
        const thepersonaNatural: personaNatural = await personaNatural.findOrFail(params.id);
        const body = request.body();
        thepersonaNatural.identificacion = body.identificacion;
        thepersonaNatural.tipoDocumento = body.tipoDocumento;
        thepersonaNatural.fechaNacimiento = body.fechaNacimiento;
        thepersonaNatural.cliente_id = body.cliente_id;
        return await thepersonaNatural.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thepersonaNatural: personaNatural = await personaNatural.findOrFail(params.id);
            response.status(204);
            return await thepersonaNatural.delete();
    }
}

