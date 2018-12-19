const loadPolyfills = () => {
    const promises = [];

    // fetch
    if (!('fetch' in window)) {
        promises.push(import(/* webpackChunkName: "polyfill-fetch" */ 'isomorphic-fetch'));
    }

    // ES6
    // TODO: need to detect only what we use and is missing...
    if (!('startsWith' in String.prototype
        && 'endsWith' in String.prototype
        && 'includes' in Array.prototype
        && 'assign' in Object
        && 'keys' in Object)) {
        promises.push(import(/* webpackChunkName: "polyfill-es6" */ './es6'));
    }

    return Promise.all(promises);
};


export default loadPolyfills;
