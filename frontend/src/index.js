// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router';
import { client } from './state';
import { BrowserRouter as Router } from 'react-router-dom';

import './localization/index';

import { ApolloProvider } from 'react-apollo';


ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root') || document.createElement('div'),
);
