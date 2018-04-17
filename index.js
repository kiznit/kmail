// This file exists to ensure the server is launched from the root directory on IIS.
// Without it, iisnode would set the working directory to "dist/server".

require('./dist/server/server');
