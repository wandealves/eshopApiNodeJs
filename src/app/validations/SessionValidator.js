import CheckValidator from 'check-validator';

import Result from '../models/Result';
import message from '../../config/message';

class SessionValidator {
    create({ email, password }) {
        const validator = new CheckValidator();
        validator.isRequired(email, message.MSG01);
        validator.isRequired(password, message.MSG02);

        if (!validator.isValid()) {
            return new Result(validator.errors(), 401, null);
        }

        return null;
    }
}

export default new SessionValidator();
