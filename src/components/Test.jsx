import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';


const Test = ({ handleSimpleAction, handlePromise, handleRejected }) => (
    <div>
        <button type="button" onClick={handleSimpleAction}>
            Simple action
        </button>
        <button type="button" onClick={handlePromise}>
            Fulfill promise
        </button>
        <button type="button" onClick={handleRejected}>
            Reject promise
        </button>
    </div>
);


Test.propTypes = {
    handleSimpleAction: PropTypes.func.isRequired,
    handlePromise: PropTypes.func.isRequired,
    handleRejected: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => {
    return {
        handleSimpleAction: event => {
            event.preventDefault();
            dispatch({
                type: 'SIMPLE',
                payload: 'cocorico',
            });
        },
        handlePromise: event => {
            event.preventDefault();
            dispatch({
                type: 'PROMISE',
                payload: new Promise((resolve, reject) => { resolve({ foo: 'bar' }); }),
            });
        },
        handleRejected: event => {
            event.preventDefault();
            dispatch({
                type: 'PROMISE',
                payload: new Promise((resolve, reject) => { reject(new Error('Bad stuff')); }),
            });
        },
    };
};


export default connect(null, mapDispatchToProps)(Test);
