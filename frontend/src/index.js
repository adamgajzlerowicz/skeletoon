// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Example from './components/example';
import { client } from './state';

import { ApolloProvider } from 'react-apollo';


ReactDOM.render(
    <ApolloProvider client={client}>
        <Example />
    </ApolloProvider>,
    document.getElementById('root') || document.createElement('div', { id: 'root' }),
);
