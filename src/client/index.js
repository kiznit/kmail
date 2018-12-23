// We need promises to load polyfills dynamically (IE 11)
require('es6-promise/auto');
const loadPolyfills = require('./polyfills').default;

// We can't import / require any other module until polyfills are loaded
loadPolyfills().then(() => {
    // It is now safe to import 'render' and start the app
    const render = require('./render').default;
    render();
});
