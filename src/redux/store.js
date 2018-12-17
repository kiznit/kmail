import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from './middleware/promise';
import thunkMiddleware from './middleware/thunk';
import reducers from './reducers';


const configureStore = (initialState) => {
    const composeEnhancers = (__BROWSER__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    const middlewares = [thunkMiddleware, promiseMiddleware];
    const enhancer = composeEnhancers(applyMiddleware(...middlewares));
    return createStore(reducers, initialState, enhancer);
};


export default configureStore;
