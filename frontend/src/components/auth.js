// @flow

import * as React from 'react';
import withUserDetails from '../hoc/withUserDetails';
import { Redirect } from 'react-router-dom';
import { client } from '../state';


const Auth = ({ data }) => {
    if (!localStorage.getItem('token') || data.error) {
        client.resetStore().then(() => {
            client.reFetchObservableQueries();
        });
        return <Redirect to="/login" />;
    }
    return null;
};

export default withUserDetails(Auth);
