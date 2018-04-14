import React from 'react';

import Layout from '../components/Layout';


const routes = {
    path: '/',

    children: [
        {
            path: '/',
            action: () => (
                <Layout>
                    <h1>This is the index page</h1>
                </Layout>
            ),
        },
        {
            path: '(.*)',
            action: () => ({
                component: (
                    <Layout>
                        <h1>Page not found</h1>
                    </Layout>
                ),
                status: 404,
            }),
        },
    ],
};


export default routes;
