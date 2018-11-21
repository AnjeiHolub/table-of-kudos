import React, {Component} from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {changeSelection} from '../../AC';
import {mapToArray} from '../../helpers';
import { throws } from 'assert';

class SelectFilter extends Component {
    render () {

        const {boards, selected} = this.props;
        const options = boards.map((board) => {
            return {
                label: board.title,
                value: board.id
            };
        });
        return (
            <div>
                <Select options = {options} value = {selected} onChange = {this.changeSelection} isMulti = {true}/>
            </div>
        );
    }

    changeSelection = (selected) => {
        this.props.changeSelection(selected);
        this.props.onChange(selected);
    }
}

const decorator = connect((state) => ({
    boards: mapToArray(state.boards.entities),
    selected: state.filters.selected
}), {changeSelection});

export default decorator(SelectFilter);
