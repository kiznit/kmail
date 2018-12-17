/*
    Redux middleware to handle HTTP requests

    Accepts actions of the following shape:
        {
            type: 'TYPE'
            request: {
                url: ...
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

    const promise = fetch(action.request.url)
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

    return dispatch({
        ...rest,
        promise,
    });
};


export default middleware;
