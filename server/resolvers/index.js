import { resolver } from 'graphql-sequelize';
import User from '../models/user';
import { isStrongPassword, validateEmail } from '../utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const withAuth = authed => (_, args, context, ...rest) => {
    if (!context.token) {
        throw new Error('Token is missing');
    }

    let result = null;

    try {
        result = jwt.verify(context.token, process.env.HASH);
    } catch (__) {
        throw new Error('Incorrect token');
    }

    const { username, email, id } = result;

    if (!username || !email || !id) {
        throw new Error('Incorrect token');
    }

    return authed(_, args, { ...context, user: { username, email, id } }, ...rest);
};


const getToken = ({ username, email, id }) => ({
    token: jwt.sign({ username, email, id }, process.env.HASH, {
        expiresIn: 60 * 10, // expires in 10 minutes
    }),
    refresh: jwt.sign({ username, email, id }, process.env.HASH, {
        // add to tokens array
        expiresIn: 60 * 60 * 24 * 31, // expires in 31 days
    }),
    ttl: 60 * 10,
});


const resolvers = {
    Query: {
        users: withAuth(resolver(User)),
        me: withAuth((_, __, context) => {
            const { user: { username, email, id } } = context;
            return { username, email, id };
        }),
    },

    Mutation: {
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

                const { username, email, id } = entity.dataValues;

                res(getToken({ username, email, id }));
            });
        }),
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
                        .then((user) => {
                            res(getToken({ username: data.username, email: data.email, id: user.dataValues.id }));
                        });
                });
            });
        },
    },
};

export {
    resolvers as default,
    withAuth,
    getToken,
    resolvers,
};

