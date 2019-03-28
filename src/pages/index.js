import React from 'react';

import Layout from '../common/Layout';
import Link from '../common/Link';
import EmailList from '../email/EmailList';
import Test from './Test';


const mockEmails = [
    {
        id: '1',
        subject: 'Advance course in Meditation - June 2019 in Vancouver',
        from: 'Nathalie Keiller',
        date: new Date('2019-03-28 13:21 PST'),
    },
    {
        id: '2',
        subject: 'kmail links',
        from: 'Thierry Tremblay',
        date: new Date('2019-03-28 9:43 PST'),
    },
    {
        id: '3',
        subject: 'Reminder - Client 2019-03-30 10:00am PDT',
        from: 'Essence Acupuncture & Wellness',
        date: new Date('2019-03-28 9:30 PST'),
    },
];


export default [
    {
        path: '/',
        action: () => ({
            content: (
                <Layout>
                    <Link href="/test">Go to the test page</Link>
                    <EmailList emails={mockEmails} />
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
