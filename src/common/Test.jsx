import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Link from './Link';
import styles from './Test.css';


const Test = ({ handleSimpleAction, handlePromise, handlePromiseFail, handleFetch, handleFetchFailed, handlePost }) => (
    <div>
        <Link href="/">Back to home page</Link>
        <div>
            <button type="button" className={styles.yellowDog} onClick={handleSimpleAction}>
                Simple action
            </button>
            <button type="button" className={styles.yellowDog} onClick={handlePromise}>
                Fulfill promise
            </button>
            <button type="button" className={styles.yellowDog} onClick={handlePromiseFail}>
                Reject promise
            </button>
            <button type="button" className={styles.yellowDog} onClick={handleFetch}>
                Fetch
            </button>
            <button type="button" className={styles.yellowDog} onClick={handleFetchFailed}>
                Fetch 404
            </button>
            <button type="button" className={styles.yellowDog} onClick={handlePost}>
                Post
            </button>
        </div>
    </div>
);


Test.propTypes = {
    handleSimpleAction: PropTypes.func.isRequired,
    handlePromise: PropTypes.func.isRequired,
    handlePromiseFail: PropTypes.func.isRequired,
    handleFetch: PropTypes.func.isRequired,
    handleFetchFailed: PropTypes.func.isRequired,
    handlePost: PropTypes.func.isRequired,
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
                    url: '/',
                },
                meta: 123,
            });
        },
        handleFetchFailed: event => {
            event.preventDefault();
            dispatch({
                type: 'FETCH404',
                request: {
                    url: '/non-existing-page',
                },
                meta: 123,
            });
        },
        handlePost: event => {
            event.preventDefault();
            dispatch({
                type: 'POST',
                request: {
                    method: 'POST',
                    url: '/login',
                },
            });
        },
    };
};


export default connect(null, mapDispatchToProps)(Test);
