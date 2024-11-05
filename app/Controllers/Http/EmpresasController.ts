import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa';

export default class EmpresasController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theEmpresa: Empresa = await Empresa.findOrFail(params.id)
            //await theEmpresa.load("cliente")
            return theEmpresa;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Empresa.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await Empresa.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }
        }
    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const theEmpresa: Empresa = await Empresa.create(body);
        return theEmpresa;
    }

    public async update({ params, request }: HttpContextContract) {
        const theEmpresa: Empresa = await Empresa.findOrFail(params.id);
        const body = request.body();
        theEmpresa.nit = body.nit;
        theEmpresa.tipoEmpresa = body.tipoEmpresa;
        theEmpresa.direccionFiscal = body.direccionFiscal;
        theEmpresa.cliente_id = body.cliente_id
        return await theEmpresa.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theEmpresa: Empresa = await Empresa.findOrFail(params.id);
            response.status(204);
            return await theEmpresa.delete();
    }
}

