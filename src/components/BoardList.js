import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {filtratedBoardsSelector} from '../selectors';
import {loadAllBoards} from '../AC';
import Loader from './Loader';
import {NavLink} from 'react-router-dom';

class BoardList extends Component {
    static propTypes = {
        //from connect (store)
        boards: PropTypes.array.isRequired, //массив досок
        //from accordion
        openItemId: PropTypes.string, //id открытого элемента (доски)
        toggleOpenItem: PropTypes.func //функция декоратора Accordion открытие/закрытие доски
    }

    componentDidMount () {
        const {loaded, loading, loadAllBoards} = this.props;
        if (!loaded && !loading) {
            loadAllBoards();
        }
    }

    render () {
        const {boards, loading} = this.props;
        if (loading) {
            return <Loader/>;
        }
        const boardElements = boards.map((board) => {
            return <li key = {board.id}>
                        <NavLink to = {`/boards/${board.id}`} activeStyle = {{color: 'red'}}>
                            {board.title}
                        </NavLink>
                    </li> 
        });

        return (
            <ul>
                {boardElements}
            </ul>
        )
    }
}

const decorator = connect((state) => {
    return {
        boards: filtratedBoardsSelector(state),
        loading: state.boards.loading,
        loaded: state.boards.loaded
    };
}, {loadAllBoards: loadAllBoards});

export default decorator(BoardList);