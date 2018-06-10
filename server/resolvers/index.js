import { resolver } from 'graphql-sequelize';
import User from '../models/user';
import { isStrongPassword, validateEmail } from '../utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const withAuth = authed => (_, args, context, ...rest) => {
    if (!context.token) {
        return new Error('Token is missing');
    }

    let result = null;

    try {
        result = jwt.verify(context.token, process.env.HASH);
    } catch (__) {
        return new Error('Incorrect token');
    }

    const { username, email } = result;
    if (!username || !email) {
        return new Error('Incorrect token');
    }

    return authed(_, args, { ...context, user: { username, email } }, ...rest);
};


const getToken = ({ username, email }) =>
    jwt.sign({ username, email }, process.env.HASH, {
        expiresIn: 60 * 60 * 24, // expires in 24 hours
    });

const resolvers = {
    Query: {

        users: withAuth(resolver(User)),

        login: (_, data) => new Promise((res, rej) => {
            const error = 'Incorrect credentials';
            User.findOne({ where: { username: data.username } }).then((entity) => {

                if (!entity || !entity.dataValues) {
                    rej(new Error(error));
                }

                const valid = bcrypt.compareSync(data.password, entity.dataValues.password_hash);

                if (!valid) {
                    rej(new Error(error));
                }

                const { username, email } = entity.dataValues;

                res({ token: getToken({ username, email }) });
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

                    User.create(data)
                        .then(res({token: getToken({ username: data.username, password: data.password })));

                });
            });
        },
    },
};

export default resolvers;
