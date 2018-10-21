import React, {Component} from 'react';

class UserForm extends Component {
    render () {
        return (
            <div>
                Name: <input type = "text" value = {this.props.value} onChange = {this.handleUserChange}/>
            </div>
        )
    }

    handleUserChange = (event) => {
        if (event.target.value.length > 10) {
            return false;
        }
        this.props.onChange(event.target.value);
    }
}

export default UserForm;