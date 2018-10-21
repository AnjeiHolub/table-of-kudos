//reducer управляющий бизнес логикой статей
import {BOARD_DELETE} from '../constants';
import {ADD_KUDOSE} from '../constants';
import {LOAD_ALL_BOARDS, LOAD_BOARD, START, SUCCESS, LOAD_KUDOSES_BOARD} from '../constants';
import {normalizedBoards as defaultBoards} from '../fixtures';
import {arrayToMap} from '../helpers';
import {Record, OrderedMap} from 'immutable';

const BoardRecord = Record({
    text: undefined,
    title: '',
    id: undefined,
    loading: false,
    kudosesLoading: false,
    kudosesLoaded: false,
    kudoses: []
});

const ReducerState = Record({
    loading: false,
    loaded: false,
    entities: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (boardsState = defaultState, action) => {
    const {type, payload, response, randomId} = action;

    switch (type) {
        case BOARD_DELETE:
            return boardsState.deleteIn(['entities', payload.id]); //immutable предоставляет метод delete
        case ADD_KUDOSE:
            //immutable предоставляет метод updateIn - для обновления данных более глубоких уровней 
            //immutable предоставляет метод update - для обновления данных верхних уровней 
            return boardsState.updateIn(
                ['entities', payload.boardId, 'kudoses'], 
                (kudoses) => {
                    return kudoses.concat(randomId);
                }
            );
        case LOAD_ALL_BOARDS + START:
            return boardsState.set('loading', true);
        case LOAD_ALL_BOARDS + SUCCESS:
            return boardsState
                        .set('entities', arrayToMap(response, BoardRecord))
                        .set('loading', false)
                        .set('loaded', true);
        case LOAD_BOARD + START:
            return boardsState.setIn(['entities', payload.id, 'loading'], true);
        case LOAD_BOARD + SUCCESS:
            return boardsState.setIn(['entities', payload.id], new BoardRecord(payload.response));
        case LOAD_KUDOSES_BOARD + START:
            return boardsState.setIn(['entities', payload.id, 'kudosesLoading'], true);
        case LOAD_KUDOSES_BOARD + SUCCESS:
            return boardsState
                        .setIn(['entities', payload.id, 'kudosesLoaded'], true)
                        .setIn(['entities', payload.id, 'kudosesLoading'], false);
    }

    return boardsState;
}