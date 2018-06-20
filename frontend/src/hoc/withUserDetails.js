// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../components/loading';
import { errorHandler } from '../helpers/errorHandler';

const withUserDetails = (Component: *) => ({ ...props }) => (
    <Query
        query={ITEMS_QUERY}
        onError={errorHandler}
        errorPolicy="ignore"
    >
        {({ error, loading, data }) => {
            if (loading) return <Loading />;
            return <Component me={error ? data : data.me} {...props} />;
        }}
    </Query>
);

const ITEMS_QUERY = gql`
  query ItemsQuery {
    me {
      id, username, email
    }
  }
`;

export default withUserDetails;
