import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import SessionValidator from '../validations/SessionValidator';
import User from '../models/User';
import Result from '../models/Result';

class SessionController {
    async create(req, res) {
        const validator = SessionValidator.create(req.body);

        if (validator) {
            return res.status(401).json(validator);
        }

        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name } = user;
        return res.json(
            new Result(null, 200, {
                user: {
                    id,
                    name,
                    email,
                },
                token: jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                }),
            })
        );
    }
}

export default new SessionController();
