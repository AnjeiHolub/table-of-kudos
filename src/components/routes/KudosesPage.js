import React from 'react';
import PropTypes from 'prop-types';
import KudosesPagination from '../KudosesPagination';
import {Redirect, Route} from 'react-router-dom';

function KudosesPage ({match}) {
    if (match.isExact) return <Redirect to = '/kudoses/1' />;
    return <Route path = '/kudoses/:page' render = {getKudosesPaginator} />;
}

function getKudosesPaginator ({match}) {
    return <KudosesPagination page = {match.params.page} />;
}

export default KudosesPage;