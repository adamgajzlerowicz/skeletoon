// @flow

import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { client } from '../state';

const Logout = () => {
    localStorage.clear();
    client.cache.reset();
    client.resetStore().then(() => {
        client.reFetchObservableQueries();
    });
    return <Redirect to="/" />;
};

export default Logout;
