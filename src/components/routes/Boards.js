import React, {Component} from 'react';
import BoardList from '../BoardList';
import Board from '../Board';
import {Route} from 'react-router-dom';

class Boards extends Component {

    render () {

        return (
            <div>
                <BoardList />
                <Route path = "/boards" children = {this.getIndex} exact />      
                <Route path = "/boards/:id" render = {this.getBoard} />
            </div>
        )
    }

    getBoard = ({match}) => {
        const {id} = match.params;
        return <Board id = {id} isOpen = {true} key = {id}/>;
    }

    getIndex = ({match}) => {
        if (!match) return <h2>Выбранная доска:</h2>;
        return <h2>Выберите себе доску</h2>;
    }
}

export default Boards;