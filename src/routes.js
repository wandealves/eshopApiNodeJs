import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/api/users', UserController.create);
routes.post('/api/sessions', SessionController.create);

routes.use(authMiddleware);

routes.put('/api/users', UserController.update);

export default routes;
