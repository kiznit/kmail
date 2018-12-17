// Redux middleware that transforms a Promise into a thunk

const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';


const isPromise = value => typeof value === 'object' && typeof value.then === 'function';


const middleware = ({ dispatch }) => next => action => {
    let promise;

    if (isPromise(action.payload)) {
        promise = action.payload;
    } else if (typeof action.payload === 'function') {
        promise = action.payload();
        if (!isPromise(promise)) {
            return next({
                ...action,
                payload: promise,
            });
        }
    } else {
        return next(action);
    }

    next({
        ...action,
        type: `${action.type}_${PENDING}`,
    });

    return promise
        .then(value => {
            const resolvedAction = {
                ...action,
                type: `${action.type}_${SUCCESS}`,
                payload: value,
            };

            dispatch(resolvedAction);

            return { value, action: resolvedAction };
        })
        .catch(error => {
            const rejectedAction = {
                ...action,
                type: `${action.type}_${FAILURE}`,
                payload: error,
                error: true,
            };

            dispatch(rejectedAction);

            throw error;
        });
};


export default middleware;
