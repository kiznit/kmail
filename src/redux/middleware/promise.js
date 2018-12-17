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
        .then(payload => {
            dispatch({
                type: `${action.type}_${SUCCESS}`,
                ...rest,
                payload,
            });

            return promise;
        })
        .catch(error => {
            dispatch({
                type: `${action.type}_${FAILURE}`,
                ...rest,
                payload: error,
                error: true,
            });

            return promise;
        });
};


export default middleware;
