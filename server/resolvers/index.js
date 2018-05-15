import { resolver } from 'graphql-sequelize';
import User from '../models/user';

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
    },
    Mutation: {
        createUser: (_, data) => User.create(data),
    },
};

export default resolvers;
