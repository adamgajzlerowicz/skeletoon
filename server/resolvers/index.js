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
    Mutation: {
        createUser: (_, data) => {
            const { username, password, email } = data;
            return new Promise((res, rej)=>{

                rej(new Error('Email format is incorrect'));

                // if (!isStrongPassword(password)) {
                //     return res.status(403).json({
                //         error: 'Password is not complex enough',
                //     });
                // }

            });

            return User.create(data);
        },
    },
};

export default resolvers;
