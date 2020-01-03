import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/api/users', UserController.post);
routes.post('/api/sessions', SessionController.post);

export default routes;
