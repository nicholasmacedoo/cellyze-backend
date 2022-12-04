import express from 'express'
import 'express-async-errors';
import cors from 'cors'

import routes from '../../../http/routes';
import { handleRequestErrors } from '../../middlewares/handleRequestErrors';



const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);
app.use(handleRequestErrors);

export default app;