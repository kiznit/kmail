import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from './middleware/promise';
import requestMiddleware from './middleware/request';
import thunkMiddleware from './middleware/thunk';
import reducers from './reducers';


const configureStore = (initialState) => {
    const composeEnhancers = (__BROWSER__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    const middlewares = [promiseMiddleware, requestMiddleware, thunkMiddleware];
    const enhancer = composeEnhancers(applyMiddleware(...middlewares));

    const store = createStore(reducers, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(reducers);
        });
    }

    return store;
};


export default configureStore;
