const { GraphQLServer } = require('graphql-yoga');
// const connection = require('./connection');


const sampleItems = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Orange' },
    { name: 'Melon' },
];

const typeDefs = `
  type Query {
    items: [Item!]!
  }

  type Item {
    name: String!
  }
`;

const resolvers = {
    Query: {
        items: () => sampleItems,
    },
};

const options = { port: 4000 };
const server = new GraphQLServer({ typeDefs, resolvers });
// eslint-disable-next-line
server.start(options, () => console.log(`Server is running on localhost:${options.port}`));
