import PropTypes from 'prop-types';
import React from 'react';
import { renderToString } from 'react-dom/server';


const Html = ({ children, title, appState }) => (
    <html>
        <head>
            <meta content="charset=utf-8" />
             <title>{title}</title>
        </head>
        <body style={{ backgroundColor: '#eee' }}>
            <h1>This is the Html component</h1>
            <div id='react-root' dangerouslySetInnerHTML={{ __html: renderToString(children) }} />
            <script dangerouslySetInnerHTML={{ __html: `window.INITIAL_APP_STATE=${JSON.stringify(appState)};` }} />
            <script src="/js/bundle.js"></script>
        </body>
    </html>
);


Html.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    appState: PropTypes.object,
};


Html.defaultProps = {
    title: 'Untitled',
};


export default Html;
