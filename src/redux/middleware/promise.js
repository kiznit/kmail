/*
    Redux middleware to handle promises

    Accepts actions of the following shape:
        {
            type: 'TYPE'
            promise: [promise]
            ...rest
        }

    Generates actions like the following:

        {
            type: 'TYPE_PENDING',
            ...rest,
        }

        {
            type: 'TYPE_SUCCESS',
            ...rest,
            payload: [resolved promise value]
        }

        {
            type: 'TYPE_FAILURE',
            ...rest,
            payload: [rejected promise error]
            error: true,
        }
*/

const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';


const isPromise = promise => !!promise && typeof promise.then === 'function';


const middleware = ({ dispatch }) => next => action => {
    const { type, promise, ...rest } = action;

    if (!isPromise(promise)) {
        return next(action);
    }

    dispatch({
        type: `${type}_${PENDING}`,
        ...rest,
    });

    return promise.then(
        payload => {
            dispatch({
                type: `${type}_${SUCCESS}`,
                ...rest,
                payload,
            });

            return payload;
        },
        error => {
            dispatch({
                type: `${type}_${FAILURE}`,
                ...rest,
                payload: error,
                error: true,
            });

            throw error;
        }
    );
};


export default middleware;
