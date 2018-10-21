import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Kudos from './Kudos';
import toggleOpen from '../decorators/toggleOpen';
import KudosForm from './KudosForm';
import Loader from './Loader';
import {connect} from 'react-redux';
import {loadKudosesBoard} from '../AC';

class KudosList extends Component {
    static defaultProps = {
        kudoses: []
    }

    static contextTypes = {
        store: PropTypes.object,
        router: PropTypes.object,
        user: PropTypes.string
    }

    componentWillReceiveProps({isOpen, loadKudosesBoard, board}) {
        const {kudosesLoading, id, kudosesLoaded} = board;
        if (!this.props.isOpen && isOpen && !kudosesLoading && !kudosesLoaded) {
            return loadKudosesBoard(id);
        }
    }

    render () {
        const {isOpen, toggleOpen} = this.props;

        return (
            <ul>
                <h3>User: {this.context.user}</h3>
                <button onClick = {toggleOpen}>{isOpen ? 'HideKudoses' : 'ShowKudoses'}</button>
                {this.getKudoses()}
            </ul>
        )
    }

    getKudoses = () => {
        const {isOpen} = this.props;
        
        if (!isOpen) {
            return null;
        }

        const {board} = this.props;
        const {kudoses, id, kudosesLoading, kudosesLoaded} = board;

        if (!kudosesLoading && !kudosesLoaded) {
            return null;
        }

        if (kudosesLoading && !kudosesLoaded) {
            return <Loader/>;
        }

        if (!kudoses.length) {
            return <p>No kudoses yet</p>;
        }

        const kudosElements = kudoses.map((id) => {
            return <li key = {id}><Kudos id = {id}/></li>
        });

        return (
            <div>
                {kudosElements}
                <KudosForm boardId = {id}/>
            </div>
        );
    }
}

const decorator = connect(null, {loadKudosesBoard: loadKudosesBoard}, null, {pure: false});

export default decorator(toggleOpen(KudosList));