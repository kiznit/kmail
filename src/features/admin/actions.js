import axios from 'axios';

axios.defaults.headers.post['X-CSRF-Token'] = global._csrfToken; // eslint-disable-line no-underscore-dangle


export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';


export const changePassword = (username, currentPassword, newPassword) => {
    const promise = axios.post('/api/changepassword', {
        username,
        currentPassword,
        newPassword,
    })
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw new Error(error.response.data.message);
            }
            throw error;
        });

    return {
        type: CHANGE_PASSWORD,
        promise,
    };
};
