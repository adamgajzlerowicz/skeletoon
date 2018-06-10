// @flow

import * as React from 'react';

const withUserDetails = (Component: React.Element<*>) => {
    class WithDetails extends React.Component {
        render() {
            return <Component />;
        }
    }
};
