export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


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

    const promise = Promise.join(request, json, (response, data) => {
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || response.statusText);
        }
    });

    return {
        type: LOGIN,
        promise,
    }
};


export const logout = () => {
    const request = fetch('/logout', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    const promise = request.then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    });

    return {
        type: LOGOUT,
        promise,
    }
};
