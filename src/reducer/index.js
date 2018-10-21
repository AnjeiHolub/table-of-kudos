//сборка всех мелких reducer-ов в один комплексный

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import counterReducer from './counter';
import boardsReducer from './boards';
import filtersReducer from './filters';
import kudosesReducer from './kudoses';

export default combineReducers({
    count: counterReducer,
    boards: boardsReducer,
    filters: filtersReducer,
    kudoses: kudosesReducer,
    router: routerReducer
})