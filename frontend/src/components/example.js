// @flow

import React, { Component } from 'react';
import './example.css';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class App extends Component<*> {
    render() {
        if (this.props.data.loading) {
            return <div>Loading</div>;
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to <code>graphql-yoga</code></h1>
                </header>
                <div className="App-intro" />
            </div>
        );
    }
}

const ITEMS_QUERY = gql`
  query ItemsQuery {
    items {
      name
    }
  }
`;

export default graphql(ITEMS_QUERY)(App);
