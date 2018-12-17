import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';


const Test = ({ handleSimpleAction, handlePromise, handlePromiseFail, handleAsync, handleAsyncFail }) => (
    <div>
        <button type="button" onClick={handleSimpleAction}>
            Simple action
        </button>
        <button type="button" onClick={handlePromise}>
            Fulfill promise
        </button>
        <button type="button" onClick={handlePromiseFail}>
            Reject promise
        </button>
        <button type="button" onClick={handleAsync}>
            Async
        </button>
        <button type="button" onClick={handleAsyncFail}>
            Async fail
        </button>
    </div>
);


Test.propTypes = {
    handleSimpleAction: PropTypes.func.isRequired,
    handlePromise: PropTypes.func.isRequired,
    handlePromiseFail: PropTypes.func.isRequired,
    handleAsync: PropTypes.func.isRequired,
    handleAsyncFail: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => {
    return {
        handleSimpleAction: event => {
            event.preventDefault();
            dispatch({
                type: 'SIMPLE',
                payload: 'cocorico',
                meta: 123,
            });
        },
        handlePromise: event => {
            event.preventDefault();
            dispatch({
                type: 'PROMISE',
                payload: new Promise((resolve, reject) => { resolve({ foo: 'bar' }); }),
                meta: 123,
            });
        },
        handlePromiseFail: event => {
            event.preventDefault();
            dispatch({
                type: 'PROMISE',
                payload: new Promise((resolve, reject) => { reject(new Error('Bad stuff')); }),
                meta: 123,
            });
        },
        handleAsync: event => {
            event.preventDefault();
            dispatch({
                type: 'ASYNC',
                payload: async () => ({ foo: 'bar' }),
                meta: 123,
            });
        },
        handleAsyncFail: event => {
            event.preventDefault();
            dispatch({
                type: 'ASYNC',
                payload: async () => { throw new Error('Bad stuff'); },
                meta: 123,
            });
        },
    };
};


export default connect(null, mapDispatchToProps)(Test);
