import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from 'components/App';
import Html from 'components/Html';


const render = () => {
    const scripts = ['/js/vendors.js', '/js/client.js'];

    const components = (
        <Html scripts={scripts}>
            <App>
                <div>
                    Hi this is the server code!
                </div>
            </App>
        </Html>
    );

    return renderToStaticMarkup(components);
};


export default render;
