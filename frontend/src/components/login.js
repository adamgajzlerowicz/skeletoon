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

class Register extends React.Component<{}, { username: string, password: string } > {
    state = {
        username: '',
        password: '',
    }

    render() {
        const { username, password } = this.state;
        return (
            <Mutation
                mutation={LOGIN}
                onError={errorHandler}
            >
                {(login, { data, error }) => {
                    if (data) {
                        localStorage.setItem('token', data.login.token);
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
                                    login({ variables: { username, password } });
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
                                    placeholder="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                />

                                <button
                                    type="submit"
                                    disabled={!allPass([username, password]).valueOf()}
                                >
                                    Login
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


const LOGIN = gql`
  mutation login($username: String!, $password:String!) {
    login(username: $username, password: $password){
      token, refresh, ttl
    }
  }
`;

export default Register;
