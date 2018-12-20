// We only want to include polyfills that are required by our application
// based on our target .browserslist. Here is the workflow I am using for this:
//
// 1) Use eslint-plugin-compat to detect when I am using a feature not supported
//    by the target browsers list.
// 2) When an error shows up in ESLint, identify what is missing and add the
//    proper polyfill(s) from core-js. This is done in webpack.client.babel.js
//    near the top. Look for 'builtInIncludeList' and find some instructions there.
// 3) Build the polyfill-es6 bundle (yarn build-client) and verify that it looks good.
// 4) Update the test that determines whether or not polyfill-es6 needs to be loaded.
//    This test can be found in src/client/polyfills/index.js inside loadPolyfills().
// 5) Disable the ESLint error for the polyfill you just added. To do so, you must
//    go to https://www.caniuse.com/ and find the feature. The name used on this
//    web site is what you need to disable the error. Add this name to your .eslintrc
//    under 'settings.polyfills'.

import 'core-js';
