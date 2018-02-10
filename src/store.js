import { applyMiddleware, compose, createStore } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack'
import reducers from './reducers';



export default function configureStore(initialState) {
    const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = [reduxPackMiddleware];
    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));

    // Hot Module Reloading (HMR) support for Redux store / reducers
    if (process.env.NODE_ENV === 'development') {
        if (module.hot) {
            module.hot.accept('./reducers', () =>
                store.replaceReducer(require('./reducers').default)
            );
        }
    }

    return store;
}
