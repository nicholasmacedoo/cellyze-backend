import { Router } from "express";
import ShepherdsControllers from "../controllers/ShepherdsControllers";

const shepherdsRoutes = Router();
const shepherdsControllers = new ShepherdsControllers();

shepherdsRoutes.post('/', shepherdsControllers.create);
shepherdsRoutes.get('/', shepherdsControllers.index);
shepherdsRoutes.delete('/:id', shepherdsControllers.delete);

export default shepherdsRoutes;