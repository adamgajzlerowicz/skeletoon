// @flow

import React, { Component } from 'react';
import { translate } from 'react-i18next';
import './home.css';

class Home extends Component<*> {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title"> {this.props.t('welcome')} </h1>
                </header>
            </div>
        );
    }
}

export default translate()(Home);
