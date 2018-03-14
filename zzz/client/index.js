import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
let App = require('../common/App').default;


hydrate(
    <AppContainer>
        <App />
    </AppContainer>, document.getElementById('root')
)
