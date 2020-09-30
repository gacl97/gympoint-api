import { Router } from 'express';

import studentsRoutes from '@modules/students/infra/http/students.routes';
import instructorsRoues from '@modules/instructors/infra/http/instructors.routes';

const routes = Router();

routes.use('/students', studentsRoutes);
routes.use('/instructors', instructorsRoues);

export default routes;
