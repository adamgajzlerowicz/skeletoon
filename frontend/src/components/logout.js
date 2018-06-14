// @flow

import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { client } from '../state';


const Logout = () => {
    localStorage.clear();
    client.resetStore();
    return <Redirect to="/" />;
};

export default Logout;
