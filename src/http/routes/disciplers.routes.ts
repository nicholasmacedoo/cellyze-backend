import { Router } from "express";
import DisciplersControllers from "../controllers/DisciplersControllers";

const disciplersRoutes = Router();
const disciplersControllers = new DisciplersControllers();

disciplersRoutes.post('/', disciplersControllers.create);
disciplersRoutes.get('/', disciplersControllers.index);
disciplersRoutes.delete('/:id', disciplersControllers.delete);

export default disciplersRoutes;