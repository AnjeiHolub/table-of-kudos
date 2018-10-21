import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {kudosSelectorFactory} from '../selectors';

function Kudos ({kudos}) {
    return (
        <div>
            <h3>{kudos.user}</h3>
            <p>{kudos.text}</p>
        </div>
    );
}

Kudos.propTypes = {
    id: PropTypes.string.isRequired,
    //from connect (из store)
    kudos: PropTypes.shape({
        text: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired
    }).isRequired
}

const mapStateToProps = () => {
    const kudosSelector = kudosSelectorFactory();
    return (state, ownProps) => { //state - это стейт стора (стейт всего приложения)
        return {                  //ownProps - наши реальные props
            kudos: kudosSelector(state, ownProps)
        }
    }
};

const decorator = connect(mapStateToProps);

export default decorator(Kudos);