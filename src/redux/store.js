import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers';


const configureStore = (initialState) => {
    const composeEnhancers = (__BROWSER__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    const middlewares = [];
    const enhancer = composeEnhancers(applyMiddleware(...middlewares));
    return createStore(reducers, initialState, enhancer);
};


export default configureStore;
