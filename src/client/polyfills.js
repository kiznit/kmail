const loadPolyfills = () => {
    const promises = [];

    if (!('fetch' in window)) {
        promises.push(import(/* webpackChunkName: "fetch-polyfill" */ 'isomorphic-fetch'));
    }

    if (!('startsWith' in String.prototype
        && 'endsWith' in String.prototype
        && 'includes' in Array.prototype
        && 'assign' in Object
        && 'keys' in Object)) {
        promises.push(import(/* webpackChunkName: "es6-polyfills" */ '@babel/polyfill'));
    }

    return Promise.all(promises);
};


export default loadPolyfills;
