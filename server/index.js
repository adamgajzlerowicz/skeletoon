import { GraphQLServer } from 'graphql-yoga';
import connection from './connection';
import { resolvers } from './resolvers';
import typeDefs from './typeDefs';
import { withAuth } from './resolvers/helpers';


const options = { port: 4000 };

const server = new GraphQLServer({
    typeDefs,
    resolvers: resolvers(withAuth),
    context: req => ({ ...req, db: connection, token: req.request.headers.token }),
});

// eslint-disable-next-line
server.start(options, () => console.log(`Server is running on localhost:${options.port}`));
