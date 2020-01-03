import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'wanderson',
        email: 'wanderson.alves.rodrigues@gmail.com',
        password_hash: '12345',
    });
    res.json(user);
});

export default routes;
