import PropTypes from 'prop-types';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Required to generate the CSS
import { MuiThemeProvider, createGenerateClassName } from 'material-ui/styles';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';

import createTheme from '../theme';


const appInsightsJavascript = `
    var appInsights=window.appInsights||function(a){
        function b(a){c[a]=function(){var b=arguments;c.queue.push(function(){c[a].apply(c,b)})}}var c={config:a},d=document,e=window;setTimeout(function(){var b=d.createElement("script");b.src=a.url||"https://az416426.vo.msecnd.net/scripts/a/ai.0.js",d.getElementsByTagName("script")[0].parentNode.appendChild(b)});try{c.cookie=d.cookie}catch(a){}c.queue=[];for(var f=["Event","Exception","Metric","PageView","Trace","Dependency"];f.length;)b("track"+f.pop());if(b("setAuthenticatedUserContext"),b("clearAuthenticatedUserContext"),b("startTrackEvent"),b("stopTrackEvent"),b("startTrackPage"),b("stopTrackPage"),b("flush"),!a.disableExceptionTracking){f="onerror",b("_"+f);var g=e[f];e[f]=function(a,b,d,e,h){var i=g&&g(a,b,d,e,h);return!0!==i&&c["_"+f](a,b,d,e,h),i}}return c
    }({
        instrumentationKey: '${process.env.APPINSIGHTS_INSTRUMENTATIONKEY}'
    });
    window.appInsights=appInsights,appInsights.queue&&0===appInsights.queue.length&&appInsights.trackPageView();`;


const Html = ({ title, description, scripts, appState, children }) => {
    // Prepare CSS generation
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();
    const theme = createTheme();

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
                { scripts.map(script => <link key={script} rel="preload" href={script} as="script" />) }
                <link rel="icon" href="/favicon.ico?v=1" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=1" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <style id="jss-server-side" dangerouslySetInnerHTML={{__html: css}} />

                { process.env.APPINSIGHTS_INSTRUMENTATIONKEY && (
                    <script type="text/javascript" dangerouslySetInnerHTML={{__html: appInsightsJavascript }} />
                )}

            </head>
            <body>
                <div id='react-root' dangerouslySetInnerHTML={{__html: html}} />
                <script dangerouslySetInnerHTML={{__html: `window.INITIAL_APP_STATE=${JSON.stringify(appState)};`}} />
                { scripts.map(script => <script key={script} src={script} />) }
            </body>
        </html>
    );
}


Html.propTypes = {
    appState: PropTypes.object,
    children: PropTypes.node.isRequired,
    description: PropTypes.string.isRequired,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
};


Html.defaultProps = {
    description: '',
    scripts: [],
    title: 'Untitled',
};


export default Html;
