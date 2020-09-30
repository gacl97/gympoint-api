import { Router } from 'express';

import InstructorController from '@modules/instructors/infra/controllers/InstructorController';

const instructorsRoutes = Router();

const instructorController = new InstructorController();

instructorsRoutes.post('/new-instructor', instructorController.create);

export default instructorsRoutes;
