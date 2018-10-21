export default (store) => {
    return (next) => {
        return (action) => {
            if (!action.generateId) {
                return next(action);    
            }
            next({
                ...action,
                randomId: (Date.now() + Math.random().toString())
            });
        }
    }
}