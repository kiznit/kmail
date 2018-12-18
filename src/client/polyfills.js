const loadPolyfills = () => {
    const promises = [];

    // fetch
    if (!('fetch' in window)) {
        promises.push(import(/* webpackChunkName: "fetch-polyfill" */ 'isomorphic-fetch'));
    }

    // ES6
    if (!('startsWith' in String.prototype
        && 'endsWith' in String.prototype
        && 'includes' in Array.prototype
        && 'assign' in Object
        && 'keys' in Object)) {
        promises.push(import(/* webpackChunkName: "es6-polyfills" */ '@babel/polyfill'));
    }

    // Intl
    if (!('Intl' in window)) {
        promises.push(import(/* webpackChunkName: "intl-polyfill" */ './intl'));
    }

    return Promise.all(promises);
};


export default loadPolyfills;
