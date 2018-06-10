// @flow

import { ApolloClient, HttpLink, InMemoryCache, setContext } from 'apollo-client-preset';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

console.log(setContext);
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token || '',
        },
    };
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export {
    client,
};
