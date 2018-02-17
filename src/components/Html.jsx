import PropTypes from 'prop-types';
import React from 'react';
import { renderToString } from 'react-dom/server';


const Html = ({ title, description, appState, children }) => (
    <html className="no-js" lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico?v=1" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=1" />
        </head>
        <body>
            <div id='react-root' dangerouslySetInnerHTML={{__html: renderToString(children)}} />
            <script dangerouslySetInnerHTML={{__html: `window.INITIAL_APP_STATE=${JSON.stringify(appState)};`}} />
            <script src="/js/bundle.js"></script>
        </body>
    </html>
);


Html.propTypes = {
    appState: PropTypes.object,
    children: PropTypes.node.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


Html.defaultProps = {
    description: '',
    title: 'Untitled',
};


export default Html;
