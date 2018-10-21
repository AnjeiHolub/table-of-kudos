import React, {Component} from 'react';
import PropTypes from 'prop-types';
import App from './App';
import store from '../store';
import {Provider} from 'react-redux';

function Root() {
    return (
        <div>
            <Provider store = {store}>
                <App />
            </Provider>
        </div>
    )
}

Root.propType = {

}

export default Root;