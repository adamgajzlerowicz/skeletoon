// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import withUserDetails from '../hoc/withUserDetails';
import { translate } from 'react-i18next';
import './nav.css';

const Nav = ({ me, t }) => (
    <ul id="nav">
        <li><Link to="/">Home</Link></li>
        { me && <li><Link to="/zone/users">/zone/users</Link></li>}
        <ul>
            { !me && <li><Link to="/login">{t('login')}</Link></li>}
            { !me && <li><Link to="/register">{t('register')}</Link> </li>}
            { me && <li><Link to="/logout">{t('logout')}</Link></li>}
            { me && <span>{t('hello')} {me.username}</span>}
        </ul>
    </ul>
);
export default translate()(withUserDetails(Nav));
