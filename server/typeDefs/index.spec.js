import schemaString from './index';
import { graphql } from 'graphql';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const schema = makeExecutableSchema({ typeDefs: schemaString });
addMockFunctionsToSchema({ schema });

test('get user', (cb) => {
    const query = `
    query tasksForUser {
      users { username }
    }
    `;

    graphql(schema, query).then(result => {
        expect(false).toBe(false);
        console.log(result);
        cb();
    });
});
