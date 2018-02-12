import React from 'react';

import Layout from '../components/Layout';


const routes = [
    {
        path: '/',
        action: () => (
            <Layout>
                <p>This is the '/' route</p>
            </Layout>
        )
    },
];


export default routes;
