import express from 'express';
import http from 'http';

const app = express();


app.get('*', (req, res) => {
    return res.send('Hello world!\n');
});


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
