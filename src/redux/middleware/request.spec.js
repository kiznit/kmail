import middleware from './request';


describe('Redux request middleware', () => {
    const promise = Promise.resolve('fetch result');
    let baseDispatch;
    let dispatch;

    beforeAll(() => {
        global.fetch = (endpoint, options) => promise;
    });

    afterAll(() => {
        delete global.fetch;
    });

    beforeEach(() => {
        baseDispatch = sinon.stub().callsFake(() => 'retval');
        dispatch = action => {
            const methods = { dispatch, getState: () => {} };
            return middleware(methods)(baseDispatch)(action);
        };
    });


    test('Transforms request action into promise action', async () => {
        const result = await dispatch({
            type: 'ACTION',
            request: {
                endpoint: '/api/awesome',
            },
            bonus: 'property',
        });

        expect(result).to.equal('retval');
        expect(baseDispatch).to.have.been.calledOnce;
        expect(baseDispatch).to.have.been.calledWithExactly({
            type: 'ACTION',
            promise,
            bonus: 'property',
        });
    });
});
