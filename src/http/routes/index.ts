import { Router } from "express";
import cellsRoutes from "./cells.routes";
import disciplersRoutes from "./disciplers.routes";
import leadersRoutes from "./leaders.routes";
import reportRoutes from "./reports.routes";
import ensureAuthenticated from "../../shared/middlewares/ensureAuthenticated";
import sessionsRouter from "./sessions.routes";
import shepherdsRoutes from "./shepherds.routes";
import tenantsRoutes from "./tenants.routes";

const routes = Router();

/** Public */
routes.use('/sessions', sessionsRouter);
routes.use('/tenants', tenantsRoutes);
routes.use('/reports', ensureAuthenticated, reportRoutes);
/** Ensure Authenticate */
routes.use('/shepherds', ensureAuthenticated, shepherdsRoutes);
routes.use('/disciplers', ensureAuthenticated, disciplersRoutes);
routes.use('/leaders', ensureAuthenticated, leadersRoutes);
routes.use('/cells', ensureAuthenticated, cellsRoutes);

export default routes;