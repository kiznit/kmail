import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';


const container = document.getElementById('react-root');


const render = () => {
    const components = (
        <App>
            <div>
                Hi this is the client code!
            </div>
        </App>
    );

    ReactDOM.hydrate(components, container);
};


render();
