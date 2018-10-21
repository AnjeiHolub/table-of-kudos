//reducer управляющий бизнес логикой комментариев
import {} from '../constants';
import {normalizedKudoses as defaultKudoses} from '../fixtures';
import {ADD_KUDOSE, LOAD_KUDOSES_BOARD, SUCCESS, LOAD_KUDOSES_FOR_PAGE, START} from '../constants';
import {arrayToMap, mapToArray} from '../helpers';
import {Record, OrderedMap, Map} from 'immutable';

const KudosRecord = Record({
    id: null,
    user: null,
    text: null
});

const ReducerState = Record({
    entities: new OrderedMap({}),
    pagination: new Map({}),
    total: null
});

const defaultState = new ReducerState();

export default (kudosesState = defaultState, action) => {
    const {type, payload, randomId, response} = action;
    switch (type) {
        case ADD_KUDOSE: 
            return kudosesState.setIn(['entities', randomId], new KudosRecord({...payload.kudos, id: randomId}));
        case LOAD_KUDOSES_BOARD + SUCCESS:
            return kudosesState.update('entities', (entities) => {
                return entities.merge(arrayToMap(response, KudosRecord));
            });
        case LOAD_KUDOSES_FOR_PAGE + START:
            return kudosesState.setIn(['pagination', payload.page, 'loading'], true);
        case LOAD_KUDOSES_FOR_PAGE + SUCCESS:
            return kudosesState
                    .set('total', response.total)
                    .mergeIn(['entities'], arrayToMap(response.records, KudosRecord))
                    .setIn(['pagination', payload.page, 'ids'], response.records.map((kudos) => {
                        return kudos.id;
                    }))
                    .setIn(['pagination', payload.page, 'loading'], false);
    }

    return kudosesState;
}