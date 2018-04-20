import React from 'react';

import Layout from '../components/Layout';
import AdminLayout from '../features/admin/AdminLayout';


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
            path: '/admin',
            action: () => <AdminLayout />,
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
