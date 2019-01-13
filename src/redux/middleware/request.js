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

    Transforms them into actions to be handled by the promise middleware:

        {
            type: 'TYPE',
            ...rest,
            promise: [fetch promise],
        }
*/


const isRequest = request => !!request && typeof request.url === 'string';


const middleware = ({ dispatch }) => next => action => {
    const { request: userRequest, ...rest } = action;

    if (!isRequest(userRequest)) {
        return next(action);
    }

    // We don't know if action.request is a normal object or a Request.
    // We can handle both with destructuring.
    const { url, ...options } = action.request;

    // We now build a Request so that we can report it in case of errors.
    const request = new Request(url, options);

    // Send CSRF token as needed
    if (['GET', 'HEAD', 'OPTIONS'].indexOf(request.method) < 0) {
        request.headers.append('X-CSRF-Token', global._csrfToken);
    }

    const promise = fetch(request).then(
        response => {
            if (!response.ok) {
                const error = new Error(`Request failed with status code ${response.status}`);
                error.request = request;
                error.response = response;
                throw error;
            }

            response.request = request;

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json()
                    .then(data => {
                        // We overwrite json() so that you can call it multiple times
                        response.json = () => Promise.resolve(data);
                        response.data = data;
                        return response;
                    });
            }

            return response.text()
                .then(text => {
                    // We overwrite text() so that you can call it multiple times
                    response.text = () => Promise.resolve(text);
                    response.data = text;
                    return response;
                });
        },
        error => {
            error.request = request;
            throw error;
        }
    );

    return dispatch({
        ...rest,
        promise,
    });
};


export default middleware;
