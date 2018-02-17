export const LOGIN = 'LOGIN';


export const login = (username, password) => {

    const request = fetch('/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
    });

    const json = request.then(response => response.json());

    // TODO: remove the delay, it is used to test login UI
    const promise = Promise.fromCallback((callback) => setTimeout(callback, 1000)).then(() => Promise.join(request, json, (response, data) => {
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || response.statusText);
        }
    }));

    return {
        type: LOGIN,
        promise,
    }
};
