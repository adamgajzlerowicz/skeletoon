import Sequelize from 'sequelize';
import connection from '../connection';
import bcrypt from 'bcrypt';
import { isStrongPassword, validateEmail } from '../utils';

const User = connection.define('user', {
    username: {
        type: Sequelize.STRING,
        set(username) {
            if(username.length < 5){
                throw new Error('Username is too short');
            }
            this.setDataValue('username', username);
        }
    },
    email: {
        type: Sequelize.STRING,
        set(email) {
            if (!validateEmail(email)) {
                throw new Error('Email is not correct');
            }
            this.setDataValue('email', email);
        },
    },
    password_hash: Sequelize.STRING,
    password: {
        type: Sequelize.VIRTUAL,
        set(password) {
            const hash = bcrypt.hashSync(password, 10);
            if (!isStrongPassword(password)) {
                throw new Error('Password is not strong enough');
            }

            this.setDataValue('password_hash', hash);
        },
    },
});

export default User;
