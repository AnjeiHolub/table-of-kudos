import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {increment} from '../AC';

class Counter extends Component {
    static PropType = {
        counter: PropTypes.number
    };

    state = {
        username: ''
    }

    render () {
        return (
            <div>
                <h2>{this.props.counter}</h2>
                <button onClick = {this.handleIncrement}>Increment me</button>
            </div>
        )
    }

    handleIncrement = () => {
        this.props.increment();
    }
}


const decorator = connect((state) => ({
    counter: state.count
}), {increment});

export default decorator(Counter);