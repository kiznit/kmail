import Imap from 'imap';


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
        resolve(imap);
    });

    imap.once('error', error => {
        reject(error);
    });

    imap.connect();
});


export { loginImap };
