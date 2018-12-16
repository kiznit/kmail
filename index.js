// Some platforms (Azure) won't allow you to set the working directory.
// This file allows us to launch iisnode from the root directory, which
// is what we want as our working directory.

require('./dist/server/server');
