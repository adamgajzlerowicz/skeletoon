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
        users: () => User.findAll(),
    },
    Mutation:{
        createUser: (_, data) => {
            return User.create(data)
        }
    }
};

export default resolvers;
