import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';


const Test = ({ handleSimpleAction, handlePromise, handlePromiseFail, handleFetch, handleFetchFailed }) => (
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
        <button type="button" onClick={handleFetch}>
            Fetch
        </button>
        <button type="button" onClick={handleFetchFailed}>
            Fetch 404
        </button>
    </div>
);


Test.propTypes = {
    handleSimpleAction: PropTypes.func.isRequired,
    handlePromise: PropTypes.func.isRequired,
    handlePromiseFail: PropTypes.func.isRequired,
    handleFetch: PropTypes.func.isRequired,
    handleFetchFailed: PropTypes.func.isRequired,
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
                promise: new Promise((resolve, reject) => { resolve({ foo: 'bar' }); }),
                meta: 123,
            });
        },
        handlePromiseFail: event => {
            event.preventDefault();
            dispatch({
                type: 'PROMISE',
                promise: new Promise((resolve, reject) => { reject(new Error('Bad stuff')); }),
                meta: 123,
            });
        },
        handleFetch: event => {
            event.preventDefault();
            dispatch({
                type: 'FETCH',
                request: {
                    endpoint: '/',
                },
                meta: 123,
            });
        },
        handleFetchFailed: event => {
            event.preventDefault();
            dispatch({
                type: 'FETCH404',
                request: {
                    endpoint: '/non-existing-page',
                },
                meta: 123,
            });
        },
    };
};


export default connect(null, mapDispatchToProps)(Test);
