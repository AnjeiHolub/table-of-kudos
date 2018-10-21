import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkAndLoadKudosesForPage} from '../AC';
import Loader from './Loader';
import {NavLink} from 'react-router-dom';
import Kudos from './Kudos';

class KudosesPagination extends Component {
    componentWillMount () {
        const {checkAndLoadKudosesForPage , page} = this.props;
        checkAndLoadKudosesForPage(page);
    }

    componentWillReceiveProps({page, checkAndLoadKudosesForPage}) {
        checkAndLoadKudosesForPage(page);
    }

    render () {
        const {total} = this.props;
        if (!total) return <Loader />;

        return (
            <div>
                {this.getKudosItems()}
                {this.getPaginator()}
            </div>
        )
    }

    getKudosItems () {
        const {kudoses, loading} = this.props;
        if (loading || !kudoses) return <Loader />;
        const kudosItems = kudoses.map((id) => {
            return <li key = {id}><Kudos id = {id} /></li>;
        })

        return (
            <ul>
                {kudosItems}
            </ul>
        );
    }

    getPaginator () {
        const {total} = this.props;
        const items = [];

        for (var i = 1; i <= Math.floor((total - 1) / 5) + 1; i++) {
            items.push(<li key = {i}><NavLink to = {`/kudoses/${i}`} activeStyle = {{color: 'red'}}>{i}</NavLink></li>);
        }

        return <ul>{items}</ul>;
    }

}

const decorator = connect((state, {page}) => {
    const {total, pagination} = state.kudoses;
    return {
        total: total,
        loading: pagination.getIn([page, 'loading']),
        kudoses: pagination.getIn([page, 'ids'])
    };
}, {checkAndLoadKudosesForPage: checkAndLoadKudosesForPage});

export default decorator(KudosesPagination);