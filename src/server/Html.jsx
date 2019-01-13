import PropTypes from 'prop-types';
import React from 'react';
import { renderToString } from 'react-dom/server';


const Html = ({ title, description, scripts, stylesheets, appState, csrfToken, children }) => {
    const markup = renderToString(children);

    return (
        <html className="no-js" lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="robots" content="noindex,nofollow" />
                { title && <title>{title}</title> }
                { description && <meta name="description" content={description} /> }
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                { scripts.map(script => <link key={script} rel="preload" href={script} as="script" />) }
                <link rel="icon" href="/favicon.ico?v=1" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=1" />
                { stylesheets.map(stylesheet => <link key={stylesheet} rel="stylesheet" type="text/css" href={stylesheet} />) }
            </head>
            <body>
                <div id="data-app-root" dangerouslySetInnerHTML={{ __html: markup }} />
                <script dangerouslySetInnerHTML={{ __html: `window.INITIAL_REDUX_STATE=${JSON.stringify(appState)};` }} />
                <script dangerouslySetInnerHTML={{ __html: `window._csrfToken = '${csrfToken}';` }} />
                { scripts.map(script => <script key={script} src={script} />) }
            </body>
        </html>
    );
};


Html.propTypes = {
    appState: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
    csrfToken: PropTypes.string.isRequired,
    stylesheets: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
};


Html.defaultProps = {
    stylesheets: [],
    description: null,
    scripts: [],
    title: null,
};


export default Html;
