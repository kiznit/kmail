import http from 'http';

import initHmr from './hmr';


initHmr
    .then(appWithHmr => {
        // The application needs to be imported *after* the client bundle is generated.
        // This is because we want to include 'assets.json' inside renders.jsx and that
        // file is generated by the client-side webpack configuration.
        const app = require('./app').default;
        let currentApp = __DEV__ ? appWithHmr(app) : app;

        // Start server
        const server = http.createServer(currentApp);
        const port = process.env.PORT || 3000;

        server.listen(port, () => {
            const addr = server.address();
            if (server.address && server.port) {
                console.log(`Server listening at http://${addr.address}:${addr.port}`);
            } else {
                console.log(`Server listening at http://localhost:${port}`);
            }
        });

        if (module.hot) {
            module.hot.accept('./app', () => {
                server.removeListener('request', currentApp);
                currentApp = appWithHmr(require('./app').default);
                server.on('request', currentApp);
            });
        }
    })
    .catch(error => {
        console.error(error.stack);
        process.exitCode = 1;
    });
