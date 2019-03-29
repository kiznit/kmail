import Imap from 'imap';

//TODO: we probably want to index connections by session id and not by username
const connections = {};


const loginImap = (username, password) => new Promise((resolve, reject) => {
    const imap = new Imap({
        connTimeout: 10000,
        authTimeout: 10000,
        host: 'mail.webfaction.com',
        port: 993,
        tls: true,
        user: username,
        password,
    });

    imap.once('ready', () => {
        connections[username] = imap;
        resolve(imap);
    });

    imap.once('error', error => {
        reject(error);
    });

    imap.once('close', hadError => {
        delete connections[username];
    });

    imap.connect();
});


const getImap = username => connections[username];


export { getImap, loginImap };
