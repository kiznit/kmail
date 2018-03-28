import { handle } from 'redux-pack';

import { LOGIN, LOGOUT } from './actions';


const defaultState = {
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
                    errorMessage: '',
                    username: '',
                }),
                success: prevState => ({
                    isAuthenticating: false,
                    errorMessage: '',
                    username: payload.username,
                }),
                failure: prevState => ({
                    isAuthenticating: false,
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
