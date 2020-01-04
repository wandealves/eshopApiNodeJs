import message from '../../config/message';
import UserValidator from '../validations/UserValidator';
import User from '../models/User';
import Result from '../models/Result';

class UserController {
    async create(req, res) {
        const validator = UserValidator.create(req.body);

        if (validator) {
            return res.status(401).json(validator);
        }

        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res.status(401).json(new Result([message.MSG06], 401, null));
        }

        const { id, name, email } = await User.create(req.body);
        return res.json(new Result(null, 200, { id, name, email }));
    }

    async update(req, res) {
        const validator = UserValidator.update(req.body);

        if (validator) {
            return res.status(400).json(validator);
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });

            if (userExists) {
                return res
                    .status(400)
                    .json(new Result([message.MSG06], 400, null));
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res
                .status(400)
                .json(new Result([message.MSG010], 400, null));
        }

        const { id, name } = await user.update(req.body);

        return res.json(
            new Result(null, 200, {
                id,
                name,
                email,
            })
        );
    }
}

export default new UserController();
