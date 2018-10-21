import {INCREMENT} from '../constants';
import {BOARD_DELETE} from '../constants';
import {CHANGE_DATE_RANGE} from '../constants';
import {CHANGE_SELECTION} from '../constants';
import {ADD_KUDOS} from '../constants';
import {LOAD_ALL_BOARDS, LOAD_BOARD, START, SUCCESS, FAIL, LOAD_KUDOSES_BOARD, LOAD_KUDOSES_FOR_PAGE} from '../constants';
import {push} from 'react-router-redux';

export function increment () {
    return {
        type: INCREMENT
    };
}

export function boardDelete (id) {
    return {
        type: BOARD_DELETE,
        payload: {
            id: id
        }
    };
}

export function changeDateRange ({from, to}) {
    return {
        type: CHANGE_DATE_RANGE,
        payload: {
            dateRange: {
                from: from,
                to: to
            }
        }
    };
}

export function changeSelection (selected) {
    return {
        type: CHANGE_SELECTION,
        payload: {
            selected: selected
        }
    };
}

export function addKudos ({user, text, boardId}) {
    return {
        type: ADD_KUDOS,
        payload: {
            kudos: {
                user: user,
                text: text
            },
            boardId: boardId
        },
        generateId: true
    };
}

export function loadAllBoards () {
    return {
        type: LOAD_ALL_BOARDS,
        callAPI: 'https://gentle-brook-11075.herokuapp.com/api/board'
    };
}

export function checkAndLoadKudosesForPage (page) {
    return (dispatch, getState) => {
        const {kudoses: {pagination}} = getState();
        if (pagination.getIn([page, 'loading']) || pagination.getIn([page, 'ids'])) {
            return;
        }

        dispatch({
            type: LOAD_KUDOSES_FOR_PAGE,
            payload: {page},
            callAPI:`https://gentle-brook-11075.herokuapp.com/api/kudos?limit=5&offset=${(page - 1) * 5}`
        });
    }
}

export function loadBoard (id) {
    return (dispatch) => {
        dispatch({
            type: LOAD_BOARD + START,
            payload: {id: id}
        });

        setTimeout(() => {
            fetch(`https://gentle-brook-11075.herokuapp.com/api/board/${id}`)
                .then((res) => {
                    if (res.status >= 400) {
                        throw new Error(res.statusText);
                    }
                    return res.json();
                })
                .then((response) => {
                    return dispatch({
                        type: LOAD_BOARD + SUCCESS,
                        payload: {id: id, response: response}
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: LOAD_BOARD + FAIL,
                        payload: {id: id, error: error}
                    });

                    dispatch(replace('/error'));
                });
        }, 1000)  
    }; 
}

export function loadKudosesBoard (id) {
    return {
        type: LOAD_KUDOSES_BOARD,
        payload: {
            id: id
        },
        callAPI: `https://gentle-brook-11075.herokuapp.com/api/kudos?board=${id}`
    };
}