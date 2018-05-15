import { resolver } from 'graphql-sequelize';
import User from '../models/user';
import { isStrongPassword, validateEmail } from '../utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const resolvers = {
    Query: {
        users: resolver(User),
        login: (_, data) => new Promise((res, rej) => {
            const error = 'Incorrect credentials';
            User.findOne({ where: { username: data.username } }).then((entity) => {

                if (!entity || !entity.dataValues) {
                    rej(new Error(error));
                }

                const valid = bcrypt.compareSync(entity.dataValues.password_hash, data.password);

                if (!valid) {
                    rej(new Error(error));
                }

                const { username, email } = entity.dataValues;
                const token = jwt.sign({ username, email }, process.env.HASH, {
                    expiresIn: 60 * 60 * 24, // expires in 24 hours
                });

                res(token);

            });
        }),
    },
    Mutation: {
        createUser: (_, data) => {
            if (data.username.length < 5) {
                throw new Error('Username is too short');
            }

            if (!validateEmail(data.email)) {
                throw new Error('Email is fromatted incorrectly');
            }

            if (!isStrongPassword(data.password)) {
                throw new Error('Password is not strong enough');
            }
            return new Promise((res, rej) => {
                const emailPromise = User.findOne({ where: { email: data.email } });
                const usernamePromise = User.findOne({ where: { username: data.username } });

                return Promise.all([emailPromise, usernamePromise]).then((validation) => {
                    if (validation[0] && validation[0].dataValues) {
                        rej(new Error('Email is already taken'));
                    }

                    if (validation[1] && validation[1].dataValues) {
                        rej(new Error('User name is already taken'));
                    }
                    return res(User.create(data));

                });
            });
        },
    },
};

export default resolvers;
