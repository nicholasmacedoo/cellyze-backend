import { Router } from "express";
import LeadersControllers from "../controllers/LeadersControllers";

const leadersRoutes = Router();
const leadersControllers = new LeadersControllers();

leadersRoutes.post('/', leadersControllers.create);
leadersRoutes.get('/', leadersControllers.index);
leadersRoutes.delete('/:id', leadersControllers.delete);

export default leadersRoutes;