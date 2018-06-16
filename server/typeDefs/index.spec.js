import schemaString from './index';
// eslint-disable-next-line
import { graphql } from 'graphql';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const schema = makeExecutableSchema({ typeDefs: schemaString });
addMockFunctionsToSchema({ schema });

test('get user', async () => {
    const query = `
    query tasksForUser {
      users { username, id, email }
    }
    `;

    const result = await graphql(schema, query);
    expect(result.data.users[0]).toHaveProperty('username');
    expect(result.data.users[0]).toHaveProperty('email');
    expect(result.data.users[0]).toHaveProperty('id');
});

test('create user', async () => {
    const query = `
     mutation {
      createUser(
            username: "nelf86dff2ff33",
            email: "nelf862@gmafdfff3il.om",
            password:"123@#$wDerlfkjsdf")
      {
        token,
        refresh,
        ttl
      }
    }
    `;

    const result = await graphql(schema, query);
    expect(result.data.createUser).toHaveProperty('token');
    expect(result.data.createUser).toHaveProperty('refresh');
    expect(result.data.createUser).toHaveProperty('ttl');
});

test('login', async () => {
    const query = `
       mutation {
         login(username: "nelf88", password: "00R0%EvBU*4Q%Qdt%84@") {
           token
           refresh
           ttl
         }
     }

    `;

    const result = await graphql(schema, query);
    expect(result.data.login).toHaveProperty('token');
    expect(result.data.login).toHaveProperty('refresh');
    expect(result.data.login).toHaveProperty('ttl');
});

test('refresh', async () => {
    const query = `
      mutation
        {
          refresh(token: "eyJhbGI6Im5lbswIqJS-ac"){
            token
          }
        }
    `;

    const result = await graphql(schema, query);
    expect(result.data.refresh).toHaveProperty('token');
});
