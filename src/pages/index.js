import React from 'react';

import Layout from '../common/Layout';
import Link from '../common/Link';
import EmailList from '../email/EmailList';
import Test from './Test';


export default [
    {
        path: '/',
        action: async () => {
            let emails = [];
            if (__BROWSER__) {
                const response = await fetch('/api/inbox');
                emails = await response.json();
                // Fix dates
                emails.forEach(email => {
                    email.date = new Date(email.date);
                });
                console.log("emails:", emails);
            }
            return (
                <Layout>
                    <Link href="/test">Go to the test page</Link>
                    <EmailList emails={emails} />
                </Layout>
            );
        },
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
