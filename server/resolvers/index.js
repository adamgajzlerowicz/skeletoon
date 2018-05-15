import { resolver } from 'graphql-sequelize';
import User from '../models/user';
import { isStrongPassword, validateEmail } from '../utils';

const sampleItems = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Orange' },
    { name: 'Melon' },
];

const resolvers = {
    Query: {
        items: () => sampleItems,
        users: resolver(User),
        login: (_, data) => {
            // console.log(data)
        },
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

                Promise.all([emailPromise, usernamePromise]).then((data) => {
                    if (data[0] && data[0].dataValues) {
                        rej(new Error('Email is already taken'));
                    }

                    if (data[1] && data[1].dataValues) {
                        rej(new Error('User name is already taken'));
                    }
                    console.log('dupa');
                    console.log(User.create(data));
                    // return res(User.create(data));
                });
            });
        },
    },
};

export default resolvers;
