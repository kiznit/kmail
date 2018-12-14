import PropTypes from 'prop-types';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createGenerateClassName, JssProvider, SheetsRegistry } from 'react-jss';


const Html = ({ title, description, scripts, appState, children }) => {
    const generateClassName = createGenerateClassName();
    const sheets = new SheetsRegistry();

    const markup = renderToString(
        <JssProvider generateClassName={generateClassName} registry={sheets}>
            { children }
        </JssProvider>
    );

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
                <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: sheets.toString() }} />
            </head>
            <body>
                <div id="app-root" dangerouslySetInnerHTML={{ __html: markup }} />
                <script dangerouslySetInnerHTML={{ __html: `window.INITIAL_APP_STATE=${JSON.stringify(appState)};` }} />
                { scripts.map(script => <script key={script} src={script} />) }
            </body>
        </html>
    );
};


Html.propTypes = {
    appState: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
    description: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
};


Html.defaultProps = {
    description: null,
    scripts: [],
    title: null,
};


export default Html;
