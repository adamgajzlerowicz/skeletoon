// @flow

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { errorHandler } from '../helpers/errorHandler';
import { customFetch } from './fetch';

const url = 'http://localhost:4000';

const httpLink = createHttpLink({
    uri: url,
    fetch: customFetch(url),
});

const authLink = setContext((_, { headers }) =>
    ({
        headers: {
            ...headers,
            token: localStorage.getItem('token') || '',
        },
    }));

const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            errorHandler(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
    }
    if (networkError) errorHandler(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([
    errorLink,
    authLink,
    httpLink,
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
window.client = client;
export {
    client,
    url,
};
