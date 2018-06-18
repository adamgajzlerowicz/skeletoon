import Sequelize from 'sequelize';
import connection from '../connection';
import bcrypt from 'bcrypt';

const Company = connection.define('company', {
    name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
    },
    childrenLimit: {
        allowNull: false,
        type: Sequelize.FLOAT,
    },
    firstHourRate: {
        allowNull: false,
        type: Sequelize.FLOAT,
    },
    hourRate: {
        allowNull: false,
        type: Sequelize.FLOAT,
    },

});

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

User.belongsTo(Company);
Company.hasOne(User);

export {
    Company,
    User,
};
