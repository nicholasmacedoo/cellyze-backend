import { Router } from "express";
import TenantsControllers from "../controllers/TenantsControllers";

const tenantsRoutes = Router();
const tenantsControllers = new TenantsControllers();

tenantsRoutes.get('/', tenantsControllers.index);
tenantsRoutes.post('/', tenantsControllers.create);
tenantsRoutes.put('/:id', tenantsControllers.update);
tenantsRoutes.get('/:nameChurch', tenantsControllers.findByChurch);

export default tenantsRoutes;