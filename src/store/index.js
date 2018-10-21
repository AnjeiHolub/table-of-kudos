import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import logger from '../middlewares/logger';
import generateId from '../middlewares/generateId';
import api from '../middlewares/api';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import history from '../history';

const enhancer = applyMiddleware(thunk, routerMiddleware(history), generateId, api, logger);

const store = createStore(reducer, {}, enhancer);

export default store;