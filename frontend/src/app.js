// @flow

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Example from './components/example';
import Login from './components/login';
import Logout from './components/logout';
import Register from './components/register';
import Nav from './components/nav';
import Auth from './components/auth';


const Users = () => <div>dupa</div>;

const App = () => (
    <Router>
        <div>
            <Nav />
            <hr />
            <Route exact path="/" component={Example} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            {/* Protected routes: */}
            <Route path="/zone" component={Auth} />
            <Route path="/zone/users" component={Users} />
        </div>
    </Router>
);

export default App;
