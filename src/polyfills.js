// The reason we import babel-polyfill in this file (and not directly from webpack) is
// so that babel-preset-env can replace it with only the required polyfills from core-js.
require('babel-polyfill');
