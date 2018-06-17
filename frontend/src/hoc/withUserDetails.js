// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Loading from '../components/loading';

const withUserDetails = (Component: *) => {
    class WithDetails extends React.Component<*> {
        render() {
            if (this.props.data.loading) {
                return <Loading />;
            }
            return <Component me={this.props.data.me} />;
        }
    }
    return graphql(ITEMS_QUERY)(WithDetails);
};

const ITEMS_QUERY = gql`
  query ItemsQuery {
    me {
      id, username, email
    }
  }
`;

export default withUserDetails;
