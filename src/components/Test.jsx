import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';


const Test = ({ handleSimpleAction, handlePromise, handlePromiseFail, handleFetch, handlePing }) => (
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
        <button type="button" onClick={handlePing}>
            Ping
        </button>
    </div>
);


Test.propTypes = {
    handleSimpleAction: PropTypes.func.isRequired,
    handlePromise: PropTypes.func.isRequired,
    handlePromiseFail: PropTypes.func.isRequired,
    handleFetch: PropTypes.func.isRequired,
    handlePing: PropTypes.func.isRequired,
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
        handleFetch: event => {
            event.preventDefault();
            dispatch({
                type: 'FETCH',
                request: {
                    url: '/',
                },
                meta: 123,
            });
        },
        handlePing: event => {
            event.preventDefault();
            dispatch({
                type: 'PING',
                request: {
                    url: '/ping',
                },
                meta: 123,
            });
        },
    };
};


export default connect(null, mapDispatchToProps)(Test);
