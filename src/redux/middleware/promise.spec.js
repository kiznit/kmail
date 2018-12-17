import middleware from './promise';


describe('Redux promise middleware', () => {
    let baseDispatch;
    let dispatch;

    beforeEach(() => {
        baseDispatch = sinon.spy();
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
});
