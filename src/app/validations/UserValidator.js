import CheckValidator from 'check-validator';

import Result from '../models/Result';
import message from '../../config/message';

class UserValidator {
    create({ name, email, password }) {
        const validator = new CheckValidator();

        validator.isRequired(name, message.MSG03);
        validator.isRequired(email, message.MSG01);
        validator.isRequired(password, message.MSG02);
        validator.isEmail(email, message.MSG04);
        validator.hasMinLen(password, 4, message.MSG05);

        if (!validator.isValid()) {
            return new Result(validator.errors(), 401, null);
        }

        return null;
    }

    update({ name, email, oldPassword, password, confirmPassword }) {
        const validator = new CheckValidator();
        validator.isString(name, message.MSG07);
        validator.isString(email, message.MSG04);

        if (oldPassword) {
            validator.hasMinLen(oldPassword, 4, message.MSG08);
            validator.isRequired(password, message.MSG02);
            validator.hasMinLen(password, 4, message.MSG05);
        }

        if (password) {
            if (confirmPassword !== password) {
                if (!validator.errors) {
                    validator.errors = [];
                }
                validator.addErros(message.MSG09);
            }
        }

        if (!validator.isValid()) {
            return new Result(validator.errors(), 400, null);
        }

        return null;
    }
}

export default new UserValidator();
