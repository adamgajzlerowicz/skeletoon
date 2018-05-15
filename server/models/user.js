import Sequelize from 'sequelize';
import connection from '../connection';
import bcrypt from 'bcrypt';
import { isStrongPassword, validateEmail } from '../utils';

const User = connection.define('user', {
    username: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password_hash: Sequelize.STRING,
    password: {
        type: Sequelize.VIRTUAL,
        set(password) {
            const hash = bcrypt.hashSync(password, 10);
            if (!isStrongPassword(password)) {
                throw 'Password is not strong enough';
            }
            
            this.setDataValue('password_hash', hash);
        },
        validate: {
            isLongEnough(val) {
                if (val.length < 7) {
                    throw new Error('Please choose a longer password');
                }
            },
        },
    },
});

export default User;
