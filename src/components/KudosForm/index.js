import React, {Component} from 'react';
import './kudosForm.css';
import {connect} from 'react-redux';
import {addKudos} from '../../AC';

class KudosForm extends Component {

    state = {
        user: '',
        text: ''
    }

    render () {
        return (
            <form onSubmit = {this.handleSubmit}>
                Name: <input type = "text" 
                             value = {this.state.user} 
                             onChange = {this.handleChange('user')}
                             className = {this.getClassName('user')}
                        />
                Text: <input type = "text" 
                             value = {this.state.text} 
                             onChange = {this.handleChange('text')}
                             className = {this.getClassName('text')}
                        />
                <input onClick = {this.handleSubmit} type = 'button' value = 'Добавь комментарий'/>
            </form>
        )
    }

    handleSubmit = (event) => {
        event.preventDefault;
        const {user, text} = this.state;
        const {boardId} = this.props;

        this.props.addKudos({
            user: user,
            text: text,
            boardId: boardId
        });

        this.setState({
            user: '',
            text: ''
        });
    }

    getClassName = (type) => {
        return this.state[type].length && this.state[type].length < limits[type].min ? 'form-input__error' : ''
    }

    handleChange = (type) => (event) => {
        const {value} = event.target;
        if (value.length > limits[type].max) {
            return;
        }
        
        this.setState({
            [type]: value
        });
    }
}

const limits = {
    user: {
        min: 5,
        max: 15
    },
    text: {
        min: 20,
        max: 50
    }
}

const decorator = connect(null, {addKudos: addKudos});

export default decorator(KudosForm);