import 'isomorphic-unfetch'; // So tiny that it's not worth putting this one in its own bundle


const loadPolyfills = () => {
    const promises = [];

    // ES6 polyfills
    const includeES6 = false;
    if (includeES6) {
        promises.push(import(/* webpackChunkName: "polyfill-es6" */ './es6'));
    }

    return Promise.all(promises);
};


export default loadPolyfills;
