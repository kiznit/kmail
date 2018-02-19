import { handle } from 'redux-pack';

import { LOGIN, LOGOUT } from '../actions/auth';


const defaultState = {
    isAuthenticated: false,
    isAuthenticating: false,
    errorMessage: '',
    username: '',
};


export default function auth(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN:
            return handle(state, action, {
                start: prevState => ({
                    isAuthenticating: true,
                    isAuthenticated: false,
                    errorMessage: '',
                    username: '',
                }),
                success: prevState => ({
                    isAuthenticating: false,
                    isAuthenticated: true,
                    errorMessage: '',
                    username: payload.username,
                }),
                failure: prevState => ({
                    isAuthenticating: false,
                    isAuthenticated: false,
                    errorMessage: payload.message,
                    username: '',
                }),
            });

        case LOGOUT:
            return handle(state, action, {
                success: () => defaultState,
            });

        default:
            return state;
    }
}
