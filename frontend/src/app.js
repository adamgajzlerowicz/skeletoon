// @flow

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Example from './components/example';
import Login from './components/login';
import Register from './components/register';
import Nav from './components/nav';

const App = () => (
    <Router>
        <div>
            <Nav />
            <hr />
            <Route exact path="/" component={Example} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </div>
    </Router>
);

export default App;
