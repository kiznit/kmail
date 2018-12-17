/*
    Redux middleware to handle HTTP requests

    Accepts actions of the following shape:
        {
            type: 'TYPE'
            request: {
                endpoint: ...
                [fetch API options],
            },
            ...rest
        }

    And transform them into actions to be handled by the promise middleware:

        {
            type: 'TYPE',
            ...rest,
            promise: [fetch promise],
        }
*/


const middleware = ({ dispatch }) => next => action => {
    const { request, ...rest } = action;

    if (!request) {
        return next(action);
    }

    const { endpoint, options } = action.request;

    const promise = fetch(endpoint, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Status ${response.status}: ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json();
            }

            return response.text();
        });

    dispatch({
        ...rest,
        promise,
    });

    return promise;
};


export default middleware;
