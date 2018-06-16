// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import withUserDetails from '../hoc/withUserDetails';

const show = data => !data.me;

const Nav = ({ data }) => (
    <ul>
        <li><Link to="/">Home</Link></li>
        { show(data) && <li><Link to="/login">Login</Link></li>}
        { show(data) && <li><Link to="/register">Register</Link> </li>}
        { !show(data) && <li><Link to="/zone/users">/zone/users</Link></li>}
        { !show(data) && <li><Link to="/logout">Logout</Link></li>}

    </ul>
);
export default withUserDetails(Nav);
