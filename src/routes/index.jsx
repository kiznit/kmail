import React from 'react';

import Layout from 'components/Layout';
import AdminLayout from 'features/admin/AdminLayout';
import DomainDialog from 'features/admin/DomainDialog';


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
                    return { redirect: '/admin/domain' };
                }

                return (
                    <AdminLayout>
                        {route.component || route}
                    </AdminLayout>
                );
            },
            children: [
                {
                    path: '/about',
                    action: () => <h1>About</h1>,
                },
                {
                    path: '/domain',
                    action: () => <DomainDialog />,
                },
                {
                    path: '/security',
                    action: () => <h1>Security</h1>,
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
