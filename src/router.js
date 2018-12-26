import React from 'react';
import UniversalRouter from 'universal-router';

import Link from './common/Link';
import Test from './common/Test';


// TODO: remove this temporary code to test the router

/* eslint-disable react/jsx-filename-extension */
const HelloWorld = () => (
    <div>
        <h1>Hello, world</h1>
        <Link href="/test">Go to the test page</Link>
    </div>
);


const routes = [
    {
        path: '/',
        action: () => ({
            content: <HelloWorld />,
        }),
    },
    {
        path: '/test',
        action: () => <Test />,
    },
];


// const resolveRoute = context => {
//     const { route, params } = context;
//     if (typeof route.action === 'function') {
//         return route.action(context, params);
//     }
//     return undefined;
// };


// const errorHandler = error => {
//     console.log(error);
//     return error.status === 404
//         ? <h1>Page Not Found</h1>
//         : <h1>Oops! Something went wrong</h1>;
// };


export default new UniversalRouter(routes, {
    //resolveRoute,
    //errorHandler,
});
