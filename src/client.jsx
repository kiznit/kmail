import React from 'react';

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

    React.render(components, document.body, container); /* eslint-disable-line react/no-deprecated */
};


render();
