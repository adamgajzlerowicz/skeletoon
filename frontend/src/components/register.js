// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const Register = () => {
    let username;
    let password;
    let email;

    return (
        <Mutation mutation={CREATE_USER}>
            {(createUser, { data }) => (
                <div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            createUser({ variables: {
                                username,
                                password,
                                email,
                            } });
                            // username = '';
                            // password = '';
                            // email = '';
                        }}
                    >

                        <input
                            placeholder="username"
                            ref={(node: ?HTMLInputElement) => {
                                username = node.value;
                            }}
                        />

                        <input
                            placeholder="email"
                            ref={(node: ?HTMLInputElement) => {
                                email = node;
                            }}
                        />

                        <input
                            placeholder="password"
                            type="password"
                            ref={(node: ?HTMLInputElement) => {
                                password = node;
                            }}
                        />
                        <button type="submit">Register</button>
                    </form>
                </div>
            )}
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
