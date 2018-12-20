import 'isomorphic-unfetch'; // So tiny that it's not worth putting this one in its own bundle


const loadPolyfills = () => {
    const promises = [];

    // ES6 - Update test to decide if ES6 polyfills should be included
    const includeES6 = (
        !Array.prototype.includes ||
        !String.prototype.startsWith ||
        !Object.entries ||
        !Object.values);

    if (includeES6) {
        promises.push(import(/* webpackChunkName: "polyfill-es6" */ './es6'));
    }

    return Promise.all(promises);
};


export default loadPolyfills;
