
const sampleItems = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Orange' },
    { name: 'Melon' },
];

const resolvers = {
    Query: {
        items: () => sampleItems,
    },
};

export default resolvers;
