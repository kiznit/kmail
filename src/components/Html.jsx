import PropTypes from 'prop-types';
import React from 'react';
import { renderToString } from 'react-dom/server';


const Html = ({ title, description, scripts, children }) => {
    const html = renderToString(
        <div>
            { children }
        </div>
    );

    return (
        <html className="no-js" lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="robots" content="noindex,nofollow" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                { scripts.map(script => <link key={script} rel="preload" href={script} as="script" />) }
                <link rel="icon" href="/favicon.ico?v=1" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=1" />
            </head>
            <body>
                <div id="react-root" dangerouslySetInnerHTML={{ __html: html }} />
                { scripts.map(script => <script key={script} src={script} />) }
            </body>
        </html>
    );
};


Html.propTypes = {
    children: PropTypes.node.isRequired,
    description: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string,
};


Html.defaultProps = {
    description: '',
    scripts: [],
    title: 'Untitled',
};


export default Html;
