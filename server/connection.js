import { User } from './models/user';
import Sequelize from 'sequelize';

const DB = process.env.APP_SQL_DB || 'skeletoon';
const SQL_LOGIN = process.env.APP_SQL_LOGIN || 'postgres';
const SQL_PASSWORD = process.env.APP_SQL_PASSWORD || 'dupa';
const SQL_HOST = process.env.APP_SQL_HOST || 'localhost';

const connection = new Sequelize(DB, SQL_LOGIN, SQL_PASSWORD, {
    host: SQL_HOST,
    dialect: 'postgres',
});

connection.authenticate()
    .then(() => {
        // eslint-disable-next-line
        console.log('connected to db');
    }).catch((err) => {
        // eslint-disable-next-line
        console.error('Unable to connect to the database:', err);
    });

connection.define('user', User);

export default connection;
