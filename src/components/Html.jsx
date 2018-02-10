import PropTypes from 'prop-types';
import React from 'react';
import { renderToString } from 'react-dom/server';


const Html = ({ children, initialState }) => (
    <html>
        <head>
            <meta content="charset=utf-8" />
             <title>KMail</title>
        </head>
        <body style={{ backgroundColor: '#eee' }}>
            <h1>Hello world!</h1>
            <div id='react-root' dangerouslySetInnerHTML={{ __html: renderToString(children) }} />
            <script type="application/javascript" dangerouslySetInnerHTML={{ __html: `window.REDUX_INITIAL_STORE_STATE=${JSON.stringify(initialState)};` }} />
            <script src="/js/bundle.js"></script>
        </body>
    </html>
);


Html.propTypes = {
    children: PropTypes.node.isRequired,
    initialState: PropTypes.shape({}),
};


export default Html;
