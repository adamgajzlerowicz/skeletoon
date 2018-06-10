// @flow

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Example from './components/example';
import Login from './components/login';
import Register from './components/register';

const App = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>

            <hr />

            <Route exact path="/" component={Example} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </div>
    </Router>
);

export default App;
