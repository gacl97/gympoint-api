import { Router } from 'express';

import studentsRoutes from '@modules/students/infra/http/students.routes';
import instructorsRoutes from '@modules/instructors/infra/http/instructors.routes';
import adminsRoutes from '@modules/admins/infra/http/admins.routes';

const routes = Router();

routes.use('/students', studentsRoutes);
routes.use('/instructors', instructorsRoutes);
routes.use('/admins', adminsRoutes);

export default routes;
