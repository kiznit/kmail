import { AUTH_LOGIN } from './actions';


const defaultState = {
    isAuthenticated: false,
    isAuthenticating: false,
    username: '',
};


export default function auth(state = defaultState, action) {
    switch (action.type) {
        case `${AUTH_LOGIN}_SUCCESS`:
            return {
                isAuthenticated: true,
                isAuthenticating: false,
                ...action.payload.data,
            };
        default:
            return state;
    }
}
