import { Router } from "express";
import CellsControllers from "../controllers/CellsControllers";

const cellsRoutes = Router();
const cellsControllers = new CellsControllers();

cellsRoutes.post('/', cellsControllers.create);
cellsRoutes.get('/', cellsControllers.index);
cellsRoutes.delete('/:id', cellsControllers.delete);

export default cellsRoutes;