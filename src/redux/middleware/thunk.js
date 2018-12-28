// This basically is the same thing as redux-thunk. I just didn't see the point of
// adding another package dependency for something this trivial.

const middleware = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }

    return next(action);
};


export default middleware;
