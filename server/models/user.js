import Sequelize from 'sequelize';
import connection from '../connection';
import bcrypt from 'bcrypt';
import { isStrongPassword, validateEmail } from '../utils';

const User = connection.define('user', {
    username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
    },
    email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
    },
    password_hash: Sequelize.STRING,
    password: {
        type: Sequelize.VIRTUAL,
        set(password) {
            const hash = bcrypt.hashSync(password, 10);
            this.setDataValue('password_hash', hash);
        },
    },
});

export default User;
