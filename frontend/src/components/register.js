// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import All from 'crocks/All';
import mconcat from 'crocks/helpers/mconcat';
import { client } from '../state';
import { errorHandler } from '../helpers/errorHandler';

const allPass = mconcat(All);

const formatError = message => message.message.replace('GraphQL error:', '');

class Register extends React.Component<{}, { username: string, password: string, email: string} > {
    state = {
        username: '',
        password: '',
        email: '',
    }
    render() {
        const { username, password, email } = this.state;
        return (
            <Mutation
                mutation={CREATE_USER}
                onError={errorHandler}
            >
                {(createUser, { data, error }) => {
                    if (data) {
                        localStorage.setItem('token', data.createUser.token);
                        client.resetStore().then(() => {
                            client.reFetchObservableQueries();
                        });
                        return <Redirect to="/" />;
                    }
                    return (
                        <div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    createUser({ variables: { username, password, email } });
                                }}
                            >

                                <input
                                    placeholder="username"
                                    name="username"
                                    value={username}
                                    required
                                    onChange={e => this.setState({ username: e.target.value })}
                                />

                                <input
                                    placeholder="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => this.setState({ email: e.target.value })}
                                />

                                <input
                                    placeholder="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                />

                                <button
                                    type="submit"
                                    disabled={!allPass([username, password, email]).valueOf()}
                                >
                            Register
                                </button>
                                {error && <div className="error"> {formatError(error)} </div>}
                            </form>
                        </div>
                    );
                }}
            </Mutation>
        );
    }
}


const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token, refresh
    }
  }

`;

export default Register;
