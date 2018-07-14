import { handle } from 'redux-pack';

import {} from './actions';


const defaultState = {
    inboundMail: {
        url: 'imap.domain.com',
        port: 993,
        security: 1,
    },
    outboundMail: {
        url: 'smtp.domain.com',
        port: 465,
        security: 1,
    },
};


export default function auth(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {
        default:
            return state;
    }
}
