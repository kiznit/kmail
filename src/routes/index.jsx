import React from 'react';

import Layout from '../components/Layout';
import Login from '../components/Login';


const routes = [
    {
        path: '/',
        action: () => (
            <Layout>
                <h1>This is the index page</h1>
            </Layout>
        )
    },
    {
        path: '/login',
        action: () => (
            <Layout>
                <Login />
            </Layout>
        )
    },
];


export default routes;
