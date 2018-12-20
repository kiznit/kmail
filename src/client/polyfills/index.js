const loadPolyfills = () => {
    const promises = [];

    // fetch
    if (!global.fetch) {
        promises.push(import(/* webpackChunkName: "polyfill-fetch" */ 'isomorphic-fetch'));
    }

    // ES6 polyfills
    const includeES6 = false;
    if (includeES6) {
        promises.push(import(/* webpackChunkName: "polyfill-es6" */ './es6'));
    }

    return Promise.all(promises);
};


export default loadPolyfills;
