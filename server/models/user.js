import Sequelize from 'sequelize';
import connection from '../connection';

const User = connection.define('user', {
    username: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
});

export default User;
