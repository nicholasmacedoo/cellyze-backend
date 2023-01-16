import { Router } from "express";
import TenantsControllers from "../controllers/TenantsControllers";

const tenantsRoutes = Router();
const tenantsControllers = new TenantsControllers();

tenantsRoutes.post('/', tenantsControllers.create);
tenantsRoutes.put('/:id', tenantsControllers.create);
tenantsRoutes.get('/:nameChurch', tenantsControllers.findByChurch);

export default tenantsRoutes;