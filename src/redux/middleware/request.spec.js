import middleware from './request';


describe('Redux request middleware', () => {
    const promise = Promise.resolve('fetch result');
    let baseDispatch;
    let dispatch;

    beforeEach(() => {
        baseDispatch = sinon.spy();
        dispatch = action => {
            const methods = { dispatch, getState: () => {} };
            return middleware(methods)(baseDispatch)(action);
        };
    });

    afterEach(() => {
        delete global.fetch;
    });


    test('Transforms request action into promise action (text response)', async () => {
        const response = {
            ok: true,
            text: () => 'Some body',
            headers: {
                get: () => null,
            },
        };
        global.fetch = (endpoint, options) => Promise.resolve(response);

        const result = await dispatch({
            type: 'ACTION',
            request: {
                endpoint: '/api/awesome',
            },
            bonus: 'property',
        });

        expect(result).to.equal('Some body');
        expect(baseDispatch).to.have.been.calledOnce;
        expect(baseDispatch).to.have.been.calledWithExactly({
            type: 'ACTION',
            promise,
            bonus: 'property',
        });
    });


    test('Transforms request action into promise action (JSON response)', async () => {
        const response = {
            ok: true,
            json: () => ({ foo: 123 }),
            headers: {
                get: () => 'application/json',
            },
        };
        global.fetch = (endpoint, options) => Promise.resolve(response);

        const result = await dispatch({
            type: 'ACTION',
            request: {
                endpoint: '/api/awesome',
            },
            bonus: 'property',
        });

        expect(result).to.deep.equal({ foo: 123 });
        expect(baseDispatch).to.have.been.calledOnce;
        expect(baseDispatch).to.have.been.calledWithExactly({
            type: 'ACTION',
            promise,
            bonus: 'property',
        });
    });


    test('Transforms failed request action into promise action', async () => {
        const response = {
            ok: false,
            status: 404,
            statusText: 'Not found',
        };
        global.fetch = (endpoint, options) => Promise.resolve(response);

        return dispatch({
            type: 'ACTION',
            request: {
                endpoint: '/api/awesome',
            },
            bonus: 'property',
        })
            .then(() => { throw new Error('Unexpected'); })
            .catch(err => {
                expect(err.message).to.equal('Status 404: Not found');
                expect(baseDispatch).to.have.been.calledOnce;
                expect(baseDispatch).to.have.been.calledWithExactly({
                    type: 'ACTION',
                    promise,
                    bonus: 'property',
                });
            });
    });
});
