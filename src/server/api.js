import Imap from 'imap';
import { inspect } from 'util';

import { Router } from 'express';
import { getImap } from './imap';


const api = new Router();

// Make sure API calls are not cached by the browser
api.get('/*', (req, res, next) => {
    res.setHeader('Last-Modified', new Date().toUTCString());
    next();
});


api.get('/inbox', (req, res) => {
    if (!req.user) {
        return res.json([]);
    }

    const imap = getImap(req.user.username);

    if (!imap) {
        return res.json([]);
    }

    const emails = [];

    imap.openBox('INBOX', true, (err, box) => {
        //console.log("box.messages:", JSON.stringify(box.messages, null, 4));
        const f = imap.seq.fetch(`${box.messages.total - 15}:*`, {
            bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
            struct: true,
        });

        f.on('message', (msg, seqno) => {
            //console.log('Message #%d', seqno);
            const email = {};

            const prefix = `(#${seqno}) `;
            msg.on('body', (stream, info) => {
                let buffer = '';
                stream.on('data', chunk => {
                    buffer += chunk.toString('utf8');
                });
                stream.once('end', () => {
                    //console.log(`${prefix}Parsed header: ${inspect(Imap.parseHeader(buffer))}`);
                    const headers = Imap.parseHeader(buffer);
                    email.subject = headers.subject ? headers.subject[0] : '';
                    email.from = headers.from ? headers.from[0] : '';
                    email.to = headers.to ? headers.to[0].split(',').map(x => x.trim()) : '';
                });
            });
            msg.once('attributes', attrs => {
                //console.log(`${prefix}Attributes: ${inspect(attrs, false, 8)}`);
                email.uid = attrs.uid;
                email.date = attrs.date;
                email.flags = attrs.flags;
            });
            msg.once('end', () => {
                //console.log(`${prefix}Finished`);
                emails.push(email);
            });
        });
        f.once('error', err => {
            //console.log('Fetch error:', err);
        });
        f.once('end', () => {
            //console.log('Done fetching all messages!');
            emails.sort((a, b) => b.date - a.date);
            res.json(emails);
        });
    });
});


export default api;
