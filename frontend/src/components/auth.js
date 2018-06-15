// @flow

import * as React from 'react';
import withUserDetails from '../hoc/withUserDetails';
import { Redirect } from 'react-router-dom';


const Auth = ({ data }) => {
    if (!localStorage.getItem('token') || data.error) {
        return <Redirect to="/login" />;
    }
    return null;
};

export default withUserDetails(Auth);
