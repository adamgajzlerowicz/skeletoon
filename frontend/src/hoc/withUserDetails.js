// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../components/loading';
import { errorHandler } from '../helpers/errorHandler';

const withUserDetails = (Component: *) => () => (
    <Query
        query={ITEMS_QUERY}
        onError={errorHandler}
    >
        {({ loading, data }) => {
            if (loading) return <Loading />;
            return <Component me={data ? data.me : null} />;
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
