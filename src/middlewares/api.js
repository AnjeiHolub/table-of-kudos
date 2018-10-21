import {START, SUCCESS, FAIL} from '../constants';

export default (store) => {
    return (next) => {
        return (action) => {
            const {callAPI, type, ...rest} = action;
            if (!callAPI) {
                return next(action);
            }

            next({
                ...rest, type: type + START
            })
            fetch(callAPI)
                .then((res) => {
                    return res.json();
                    
                })
                .then((response) => {
                    return next({...rest, type: type + SUCCESS, response: response});
                })
                .catch((error) => {
                    return next({...rest, type: type + FAIL, error: error});
                });
        }
    }
}