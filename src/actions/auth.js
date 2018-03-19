import axios from 'axios';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export const login = (username, password) => {

    const promise = axios.post('/api/login', {
        username,
        password,
    })
    .then(response => {
        return response.data;
    })
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
    .then(response => {
        return response.data;
    });

    return {
        type: LOGOUT,
        promise,
    };
};
