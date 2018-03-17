import { applyMiddleware, compose, createStore } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack'
import reducers from './reducers';



export default function configureStore(initialState) {
    const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = [reduxPackMiddleware];
    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));

    if (module.hot) {
        module.hot.accept('./reducers');
    }

    return store;
}
