import PropTypes from 'prop-types';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Required to generate the CSS
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';


const theme = createMuiTheme();


const Html = ({ title, description, appState, children }) => {
    // Prepare CSS generation
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();

    // Generate HTML
    const html = renderToString(
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                { children }
            </MuiThemeProvider>
        </JssProvider>
    );

    // Generate CSS
    const css = sheetsRegistry.toString();

    // Render
    return (
        <html className="no-js" lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico?v=1" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=1" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
            </head>
            <body>
                <style id="jss-server-side" dangerouslySetInnerHTML={{__html: css}} />
                <div id='react-root' dangerouslySetInnerHTML={{__html: html}} />
                <script dangerouslySetInnerHTML={{__html: `window.INITIAL_APP_STATE=${JSON.stringify(appState)};`}} />
                <script src="/js/bundle.js"></script>
            </body>
        </html>
    );
}


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
