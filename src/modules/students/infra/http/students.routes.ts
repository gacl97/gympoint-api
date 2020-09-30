import { Router } from 'express';

import StudentController from '@modules/students/infra/controllers/StudentController';

const studentController = new StudentController();

const studentsRouter = Router();

studentsRouter.post('/new-student', studentController.create);

export default studentsRouter;
