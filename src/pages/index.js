import React from 'react';

import Layout from '../common/Layout';
import Link from '../common/Link';
import Test from './Test';


export default [
    {
        path: '/',
        action: () => ({
            content: (
                <Layout>
                    <h1>Hello, world</h1>
                    <Link href="/test">Go to the test page</Link>
                </Layout>
            ),
        }),
    },
    {
        path: '/test',
        action: () => (
            <Layout>
                <Test />
            </Layout>
        ),
    },
];
