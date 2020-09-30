import { Router } from 'express';

import AdminController from '@modules/admins/infra/controllers/AdminController';

const adminsRouter = Router();

const adminController = new AdminController();

adminsRouter.post('/new-admin', adminController.create);

export default adminsRouter;
