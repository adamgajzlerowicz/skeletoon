import { resolver } from 'graphql-sequelize';
import { User, Company } from '../models';
import { isStrongPassword, validateEmail } from '../utils';
import bcrypt from 'bcrypt';
import { decode, getToken } from './helpers';
import {
    t,
    INCORRECT_DETAILS_ERROR,
    USERNAME_TOO_SHORT_ERROR,
    INCORRECT_EMAIL_ERROR,
    WEAK_PASSWORD_ERROR,
    EMAIL_IN_USE_ERROR,
    USERNAME_IN_USE_ERROR,
} from '../localization';



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
                    rej(new Error(t.t(INCORRECT_DETAILS_ERROR)));
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
                throw new Error(t.key(USERNAME_TOO_SHORT_ERROR));
            }

            if (!validateEmail(data.email)) {
                throw new Error(t.key(INCORRECT_EMAIL_ERROR));
            }

            if (!isStrongPassword(data.password)) {
                throw new Error(t.key(WEAK_PASSWORD_ERROR));
            }
            return new Promise((res, rej) => {
                const emailPromise = User.findOne({ where: { email: data.email } });
                const usernamePromise = User.findOne({ where: { username: data.username } });

                return Promise.all([emailPromise, usernamePromise]).then((validation) => {
                    if (validation[0] && validation[0].dataValues) {
                        rej(new Error(t.key(EMAIL_IN_USE_ERROR)));
                    }

                    if (validation[1] && validation[1].dataValues) {
                        rej(new Error(t.key(USERNAME_IN_USE_ERROR)));
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

