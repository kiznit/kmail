import middleware from './promise';


describe('Redux promise middleware', () => {
    let baseDispatch;
    let dispatch;

    beforeEach(() => {
        baseDispatch = sinon.spy(action => {
            if (action.type === 'THROW_SUCCESS') {
                throw new Error('error while dispatching');
            }
        });
        dispatch = action => {
            const methods = { dispatch, getState: () => {} };
            return middleware(methods)(baseDispatch)(action);
        };
    });


    test('Transforms fulfilled promise into actions', async () => {
        const result = await dispatch({
            type: 'ACTION',
            promise: Promise.resolve({ foo: 123 }),
            bonus: 'property',
        });

        expect(result).to.deep.equal({ foo: 123 });
        expect(baseDispatch).to.have.been.calledTwice;
        expect(baseDispatch).to.have.been.calledWithExactly({
            type: 'ACTION_PENDING',
            bonus: 'property',
        });
        expect(baseDispatch).to.have.been.calledWithExactly({
            type: 'ACTION_SUCCESS',
            payload: { foo: 123 },
            bonus: 'property',
        });
    });


    test('Transforms rejected promise into actions', async () => {
        const error = new Error('Bad luck');

        return dispatch({
            type: 'ACTION',
            promise: Promise.reject(error),
            bonus: 'property',
        })
            .then(() => { throw new Error('Unexpected'); })
            .catch(err => {
                expect(err).to.equal(error);
                expect(baseDispatch).to.have.been.calledTwice;
                expect(baseDispatch).to.have.been.calledWithExactly({
                    type: 'ACTION_PENDING',
                    bonus: 'property',
                });
                expect(baseDispatch).to.have.been.calledWithExactly({
                    type: 'ACTION_FAILURE',
                    payload: error,
                    error: true,
                    bonus: 'property',
                });
            });
    });


    test('If dispatch(ACTION_SUCCESS) throws, we don\'t want to swallow the exception', async () => {
        let error;
        let result;

        try {
            result = await dispatch({
                type: 'THROW',
                promise: Promise.resolve({ foo: 123 }),
                bonus: 'property',
            });
        }
        catch (err) {
            error = err;
        }

        expect(error).to.be.an('error');
        expect(error.message).to.equal('error while dispatching');

        expect(result).to.be.undefined;

        expect(baseDispatch).to.have.been.calledTwice;
        expect(baseDispatch).to.have.been.calledWithExactly({
            type: 'THROW_PENDING',
            bonus: 'property',
        });
        expect(baseDispatch).to.have.been.calledWithExactly({
            type: 'THROW_SUCCESS',
            payload: { foo: 123 },
            bonus: 'property',
        });
    });
});
