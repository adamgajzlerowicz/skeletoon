// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { client } from './state';
import { BrowserRouter as Router } from 'react-router-dom';


import { ApolloProvider } from 'react-apollo';


ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root') || document.createElement('div', { id: 'root' }),
);
