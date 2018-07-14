import axios from 'axios';

axios.defaults.headers.post['X-CSRF-Token'] = global._csrfToken; // eslint-disable-line no-underscore-dangle


export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const login = (username, password) => {
    const promise = axios.post('/api/login', {
        username,
        password,
    })
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw new Error(error.response.data.message);
            }
            throw error;
        });

    return {
        type: LOGIN,
        promise,
    };
};


export const logout = () => {
    const promise = axios.post('/api/logout')
        .then(response => response.data);

    return {
        type: LOGOUT,
        promise,
    };
};
