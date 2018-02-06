import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';



export default function configureStore(initialState) {
    const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(reduxThunk)));

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
