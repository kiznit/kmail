// Redux middleware to handle HTTP requests

const middleware = ({ dispatch }) => next => action => {
    if (action.request === undefined) {
        return next(action);
    }

    const promise = fetch(action.request.url)
        .then(response => {
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json();
            }

            return response.text();
        });

    return dispatch({
        ...action,
        request: undefined,
        payload: promise,
    });
};


export default middleware;
