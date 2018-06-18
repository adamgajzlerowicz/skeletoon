import { resolver } from 'graphql-sequelize';
import { User, Company } from '../models';
import { isStrongPassword, validateEmail } from '../utils';
import bcrypt from 'bcrypt';
import { decode, getToken } from './helpers';

const INCORRECT_DETAILS_ERROR = 'Incorrect credentials';

const resolvers = withAuth => ({
    Query: {
        users: withAuth(resolver(User)),
        me: withAuth((_, __, { user: { username, email, id } }) =>
            User.findOne({ where: { username, email, id }, include: [{ model: Company }] })),
    },

    Mutation: {
        login: (_, data) => new Promise((res, rej) => {
            User.findOne({ where: { username: data.username } }).then((entity) => {

                if (!entity || !entity.dataValues) {
                    rej(new Error(INCORRECT_DETAILS_ERROR));
                }

                const valid = bcrypt.compareSync(data.password, entity.dataValues.password_hash);

                if (!valid) {
                    rej(new Error(INCORRECT_DETAILS_ERROR));
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
                throw new Error('Email is incorrect');
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
        refresh: (_, data) => {
            const { username, email, id } = decode(data.token);
            return getToken({ username, email, id });
        },
    },
});

export {
    resolvers as default,
    resolvers,
};

