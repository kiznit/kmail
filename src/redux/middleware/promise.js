// Redux middleware to handle promises

const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';


const isPromise = value =>
    !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';


const middleware = ({ dispatch }) => next => action => {
    if (!isPromise(action.payload)) {
        return next(action);
    }

    dispatch({
        ...action,
        type: `${action.type}_${PENDING}`,
        payload: undefined,
    });

    const promise = action.payload;

    return promise
        .then(result => {
            dispatch({
                ...action,
                type: `${action.type}_${SUCCESS}`,
                payload: result,
            });
            return promise;
        })
        .catch(error => {
            dispatch({
                ...action,
                type: `${action.type}_${FAILURE}`,
                payload: error,
                error: true,
            });
            return Promise.reject(error);
        });
};


export default middleware;
