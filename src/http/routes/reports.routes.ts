import { Router } from "express";
import ensureAuthenticated from "../../shared/middlewares/ensureAuthenticated";
import ReportControllers from "../controllers/ReportsControllers";

const reportRoutes = Router();
const reportControllers = new ReportControllers();

reportRoutes.post('/', reportControllers.create);
reportRoutes.get('/month', ensureAuthenticated, reportControllers.createReportPDF);
reportRoutes.get('/month/:cell_id', ensureAuthenticated, reportControllers.createReportByCell);
/** 
 * Endpoint para retornar relatorio agrupados por mês
 */
reportRoutes.get('/monthly', ensureAuthenticated, reportControllers.getMonthlyReports);

export default reportRoutes;