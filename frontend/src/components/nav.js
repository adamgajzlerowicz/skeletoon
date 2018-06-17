// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import withUserDetails from '../hoc/withUserDetails';
import './nav.css';

const Nav = ({ me }) => (
    <ul id="nav">
        <li><Link to="/">Home</Link></li>
        { me && <li><Link to="/zone/users">/zone/users</Link></li>}
        <ul>
            { !me && <li><Link to="/login">Login</Link></li>}
            { !me && <li><Link to="/register">Register</Link> </li>}
            { me && <li><Link to="/logout">Logout</Link></li>}
            { me && <span>Hello {me.username}</span>}
        </ul>
    </ul>
);
export default withUserDetails(Nav);
