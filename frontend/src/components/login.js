// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import All from 'crocks/All';
import mconcat from 'crocks/helpers/mconcat';
import { client } from '../state';
import { errorHandler } from '../helpers/errorHandler';
import { translate } from 'react-i18next';

const allPass = mconcat(All);

const formatError = message => message.message.replace('GraphQL error:', '');

class Register extends React.Component<{t: string => string}, { username: string, password: string } > {
    state = {
        username: '',
        password: '',
    }

    render() {
        const { username, password } = this.state;
        const { t } = this.props;

        return (
            <Mutation
                mutation={LOGIN}
                onError={errorHandler}
            >
                {(login, { data, error }) => {
                    if (data) {
                        localStorage.setItem('token', data.login.token);
                        localStorage.setItem('refresh', data.login.refresh);
                        client.cache.reset();
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
                                    placeholder={t('username')}
                                    name="username"
                                    value={username}
                                    required
                                    onChange={e => this.setState({ username: e.target.value })}
                                />

                                <input
                                    placeholder={t('password')}
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                />

                                <button
                                    type="submit"
                                    disabled={!allPass([username, password]).valueOf()}
                                >
                                    {t('login')}
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
      token, refresh
    }
  }
`;

export default translate()(Register);
