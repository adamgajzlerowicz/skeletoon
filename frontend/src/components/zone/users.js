// @flow

import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../loading';
import { errorHandler } from '../../helpers/errorHandler';

const Users = () => (
    <Query
        query={ITEMS_QUERY}
        onError={errorHandler}
    >
        {({ loading, data }) => {
            if (loading) return <Loading />;
            return (
                <ul>
                    { data.users.map(user => (
                        <li key={user.username}>{user.username}</li>
                    ))}
                </ul>

            );
        }}
    </Query>
);

const ITEMS_QUERY = gql`
  query ItemsQuery {
    users {
      username, email
    }
  }
`;

export default Users;
