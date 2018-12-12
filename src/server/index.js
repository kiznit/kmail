import http from 'http';

import app from './app';


const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    const addr = server.address();
    if (server.address && server.port) {
        console.log(`Server listening at http://${addr.address}:${addr.port}`);
    } else {
        console.log(`Server listening at http://localhost:${port}`);
    }
});
