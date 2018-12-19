import 'isomorphic-unfetch'; // So tiny that it's not worth putting this one in its own bundle


const loadPolyfills = () => {
    const promises = [];

    // ES6 - TODO: detect everything we need
    if (!('startsWith' in String.prototype
        && 'endsWith' in String.prototype
        && 'includes' in Array.prototype
        && 'assign' in Object
        && 'keys' in Object
        && 'values' in Object
        && 'entries' in Object)) {
        promises.push(import(/* webpackChunkName: "polyfill-es6" */ './es6'));
    }

    return Promise.all(promises);
};


export default loadPolyfills;
