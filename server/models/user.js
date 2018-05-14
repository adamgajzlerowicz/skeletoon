const Sequelize = require('sequelize');
// import sequelize from '../index';

const User = {
    username: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
};

export default User;
