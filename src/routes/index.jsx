import React from 'react';

import Layout from 'components/Layout';
import AdminLayout from 'features/admin/AdminLayout';
import AdminSettings from 'features/admin/AdminSettings';


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
            async action({ next }) {
                const route = await next();
                if (!route) {
                    return { redirect: '/admin/settings' };
                }

                return (
                    <AdminLayout>
                        {route.component || route}
                    </AdminLayout>
                );
            },
            children: [
                {
                    path: '/settings',
                    action: () => <AdminSettings />,
                },
            ],
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
