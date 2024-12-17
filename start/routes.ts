/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import "./routes/departamentos"
import "./routes/municipios"
import "./routes/centrosDistribucion"
import "./routes/direcciones"
import "./routes/usuarios"
import "./routes/clientes"
import "./routes/conductores"
import "./routes/duenos"
import "./routes/administradores"
import "./routes/empresas"
import "./routes/personasNaturales"
import "./routes/contratos"
import "./routes/vehiculos"
import "./routes/seguros"
import "./routes/operaciones"
import "./routes/productos"
import "./routes/rutas"
import "./routes/cuotas"
import "./routes/duenoVehiculos"
import "./routes/vehiculoConductores"
import "./routes/dirListaOrdendes"
import "./routes/lotes"
import "./routes/turnos"
import "./routes/facturas"
import "./routes/categorias"
import "./routes/categoriasProductos"
import "./routes/servicios"
import "./routes/restaurantes"
import "./routes/hoteles"
import "./routes/gastos"
import "./routes/facturas"
import "./routes/platos"
import "./routes/platosRestaurantes"
import "./routes/chats"
