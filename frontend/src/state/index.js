// @flow

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) =>
    ({
        headers: {
            ...headers,
            token: sessionStorage.getItem('token') || '',
        },
    }));

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export {
    client,
};
