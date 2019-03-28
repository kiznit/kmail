export const AUTH_LOGIN = 'AUTH_LOGIN';


export const login = (username, password) => {
    return {
        type: AUTH_LOGIN,
        request: {
            method: 'POST',
            url: '/api/login',
            body: {
                username,
                password,
            },
        },
    };
};
