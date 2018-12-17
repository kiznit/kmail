/*
    Redux middleware to handle promises

    Accepts actions of the following shape:
        {
            type: 'TYPE'
            promise: [promise]
            ...rest
        }

    And generate actions like the following:

        {
            type: 'TYPE_PENDING',
            ...rest,
        }

        {
            type: 'TYPE_SUCCESS',
            ...rest,
            value: [resolved promise value]
        }

        {
            type: 'TYPE_FAILURE',
            ...rest,
            error: [rejected promise error]
        }
*/

const PENDING = 'PENDING';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';


const middleware = ({ dispatch }) => next => action => {
    const { type, promise, ...rest } = action;  /* eslint-disable-line no-unused-vars */

    if (!promise) {
        return next(action);
    }

    dispatch({
        type: `${action.type}_${PENDING}`,
        ...rest,
    });

    return promise
        .then(value => {
            dispatch({
                type: `${action.type}_${SUCCESS}`,
                ...rest,
                value,
            });
            return promise;
        })
        .catch(error => {
            dispatch({
                type: `${action.type}_${FAILURE}`,
                ...rest,
                error,
            });
            return Promise.reject(error);
        });
};


export default middleware;
