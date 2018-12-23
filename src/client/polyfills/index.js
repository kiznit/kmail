const loadPolyfills = () => {
    const promises = [];

    // fetch
    if (!global.fetch) {
        promises.push(import(/* webpackChunkName: "polyfill-fetch" */ 'isomorphic-fetch'));
    }

    // ES6 polyfills
    const includeES6 = !Object.assign;
    if (includeES6) {
        promises.push(import(/* webpackChunkName: "polyfill-es6" */ './es6'));
    }

    // DOM Element.remove() for IE (used by HMR)
    if (__DEV__) {
        if (!Element.prototype.remove) {
            Element.prototype.remove = function remove() {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            };
        }
    }

    return Promise.all(promises);
};


export default loadPolyfills;
