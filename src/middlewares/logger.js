export default (store) => {
    return (next) => {
        return (action) => {
            next(action);
        }
    }
}