import React, {Component} from 'react';
import {connect} from 'react-redux';
import SelectFilter from './Select';
import './components/app/app.css';
import './components/kudos-app/kudos-app.css';
import './components/kudos-board/kudos-board.css';
import './components/kudos-tools/kudos-tools.css';
import './components/kudos-edit/kudos-edit.css';
import './components/kudos-text-editor/kudos-text-editor.css';

import './components/kudos-app/kudos-app.js';
import './components/kudos-model/kudos-model.js';
import './components/kudos-edit/kudos-edit.js';
import './components/kudos-tools/kudos-tools.js';
import './components/kudos-board/kudos-board.js';
import './components/kudos-text-editor/kudos-text-editor.js';
import './components/app/app.js';

class BoardOfKudos extends Component {

    state = {
        selectedBoard: null
    }

    componentDidMount () {
        this.startAppBoardOfKudos();
    }

    componentDidUpdate () {
        this.startAppBoardOfKudos();
    }

    render () {
        const {selected} = this.props;
        
        if (selected.length === 0) {
            return (
                <SelectFilter onChange = {this.handleSelectedBoardChange}/>
            );
        }

        return (
            <div>
                <SelectFilter onChange = {this.handleSelectedBoardChange}/>
                <section className="container-app clearfix">
                    <div className="table-field">

                    </div>

                    <div className="tools-field">
                    
                    </div>

                    <div className="edit-field">

                    </div>
                </section>
            </div>
        );
    }

    handleSelectedBoardChange = (selected) => {
        this.setState({
            selectedBoard: selected
        });
    }

    startAppBoardOfKudos () {
        const {selected} = this.props;
        if (selected.length !== 0 && selected.value !== this.state.selectedBoard[0].value) {
            var evt = document.createEvent("Event");
            evt.initEvent("startApp",true,true);
            evt.boardId = selected[0].value;
            document.dispatchEvent(evt);
        }
    }
}

const decorator = connect((state) => ({
    selected: state.filters.selected
}));

export default decorator(BoardOfKudos);