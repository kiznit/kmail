import React from 'react';
import UniversalRouter from 'universal-router';

import pages from './pages';
import Status404 from './pages/Status404';


const routes = [
    ...pages,
];


const errorHandler = (error, context) => {
    if (error.status === 404) {
        return {
            status: error.status,
            content: <Status404 url={context.pathname} />,
        };
    }

    throw error;
};


export default new UniversalRouter(routes, {
    errorHandler,
});
