import React, {Component} from 'react';
import PropTypes from 'prop-types';
import KudosList from '../KudosList';
import {CSSTransition} from 'react-transition-group';
import './main.css';
import {connect} from 'react-redux';
import {boardDelete, loadBoard} from '../../AC';
import Loader from '../Loader';

class Board extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        isOpen: PropTypes.bool, //параметр открыта/закрыта доска
        toggleOpen: PropTypes.func, //функция декоратора Accordion открытие/закрытие доски
        //from connect
        board: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            text: PropTypes.string
        })
    }

    componentDidMount() {
        const {loadBoard, board, id} = this.props;
        if (!board || (!board.text && !board.loading)) {
            return loadBoard(id);
        }
    }

    /*
    shouldComponentUpdate (nextProps, nextState) {
        //return true - позволяет обновить элемент, return false - запрещает обновить элемент
        return nextProps.isOpen !== this.props.isOpen //если isOpen не поменялся, не обновляй элемент
    }
    */

    render () {
        const {board, isOpen, toggleOpen} = this.props;
        if (!board) {
            return null;
        }
        return (
            <div>
                <h3>{board.title}</h3>
                <button onClick = {toggleOpen}>
                    {isOpen ? 'Close' : 'Open'}
                </button>
                <button onClick = {this.handleDelete}>Delete me</button>
                <CSSTransition
                    in = {isOpen}
                    classNames = "board"
                    timeout = {{ enter: 500, exit: 500 }}
                >
                    {this.getBody()}
                </CSSTransition>
            </div>
        )
    }

    getBody = () => {
        const {isOpen, board} = this.props;
        if (!isOpen) return (<div></div>);
        if (board.loading) {
            return <Loader/>;
        }
        return (<div>
                    <section>{board.text}</section>
                    <KudosList board = {board} />
                </div>);
    }

    handleDelete = () => {
        const {board} = this.props;
        this.props.boardDelete(board.id);
    }
}

const decorator = connect((state, ownProps) => {
    return {
        board: state.boards.entities.get(ownProps.id)
    };
}, {boardDelete: boardDelete, loadBoard: loadBoard}, null, {pure: false});

export default decorator(Board);