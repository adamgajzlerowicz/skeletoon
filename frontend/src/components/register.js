// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import All from 'crocks/All';
import mconcat from 'crocks/helpers/mconcat';

const allPass = mconcat(All);

const formatError = message => message.message.replace('GraphQL error:', '');

const Register = () => {
    let username = '';
    let password = '';
    let email = '';

    return (
        <Mutation mutation={CREATE_USER}>
            {(createUser, { data, error }) => {
                if (data) {
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
                                ref={(node: ?HTMLInputElement) => { username = node && node.value; }}
                            />

                            <input
                                placeholder="email"
                                type="email"
                                ref={(node: ?HTMLInputElement) => { email = node && node.value; }}
                            />

                            <input
                                placeholder="password"
                                type="password"
                                ref={(node: ?HTMLInputElement) => { password = node && node.value; }}
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
};

const CREATE_USER = gql`
  mutation addTodo($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      username
    }
  }

`;

export default Register;
