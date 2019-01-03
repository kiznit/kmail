import middleware from './request';


describe('Redux request middleware', () => {
    let baseDispatch;
    let dispatch;

    beforeEach(() => {
        baseDispatch = sinon.spy(action => action.promise);
        dispatch = action => {
            const methods = { dispatch, getState: () => {} };
            return middleware(methods)(baseDispatch)(action);
        };
    });

    afterEach(() => {
        delete global.fetch;
    });


    test('Transforms request action into promise action (text response)', async () => {
        global.fetch = (url, options) => Promise.resolve(
            new Response('Some body', { status: 200, statusText: 'OK' })
        );

        const response = await dispatch({
            type: 'ACTION',
            request: {
                url: '/api/awesome',
            },
            bonus: 'property',
        });

        expect(response.data).to.equal('Some body');
        expect(response.request.method).to.equal('GET');
        expect(response.request.url).to.equal('/api/awesome');

        expect(baseDispatch).to.have.been.calledOnce;
        expect(baseDispatch).to.have.been.calledWithExactly({
            type: 'ACTION',
            promise: Promise.resolve(),
            bonus: 'property',
        });

        return expect(response.text()).to.eventually.equal('Some body');
    });


    test('Transforms request action into promise action (JSON response)', async () => {
        global.fetch = (url, options) => Promise.resolve(
            new Response('{ "foo": 123 }', { status: 200, statusText: 'OK', headers: { 'Content-Type': 'application/json' } })
        );

        const response = await dispatch({
            type: 'ACTION',
            request: {
                url: '/api/awesome',
            },
            bonus: 'property',
        });

        expect(response.data).to.deep.equal({ foo: 123 });
        expect(response.request.method).to.equal('GET');
        expect(response.request.url).to.equal('/api/awesome');

        expect(baseDispatch).to.have.been.calledOnce;
        expect(baseDispatch).to.have.been.calledWithExactly({
            type: 'ACTION',
            promise: Promise.resolve(),
            bonus: 'property',
        });

        return expect(response.json()).to.eventually.deep.equal({ foo: 123 });
    });


    test('Transforms failed request action into promise action', async () => {
        global.fetch = (url, options) => Promise.resolve(
            new Response('Bad stuff', { status: 404, statusText: 'NOT FOUND' })
        );

        const promise = dispatch({
            type: 'ACTION',
            request: {
                url: '/api/awesome',
            },
            bonus: 'property',
        });

        return expect(promise).to.eventually.be.rejected.then(error => {
            expect(error.message).to.equal('Request failed with status code 404');
            expect(error.request.method).to.equal('GET');
            expect(error.request.url).to.equal('/api/awesome');
            expect(error.response.status).to.equal(404);
            expect(error.response.statusText).to.equal('NOT FOUND');

            expect(baseDispatch).to.have.been.calledOnce;
            expect(baseDispatch).to.have.been.calledWithExactly({
                type: 'ACTION',
                promise: Promise.resolve(),
                bonus: 'property',
            });
        });
    });


    test('Request can be specified with a Request object', async () => {
        global.fetch = (url, options) => Promise.resolve(
            new Response('Some body', { status: 200, statusText: 'OK' })
        );

        const response = await dispatch({
            type: 'ACTION',
            request: new Request('/api/awesome'),
            bonus: 'property',
        });

        expect(response.data).to.equal('Some body');

        expect(baseDispatch).to.have.been.calledOnce;
        expect(baseDispatch).to.have.been.calledWithExactly({
            type: 'ACTION',
            promise: Promise.resolve(),
            bonus: 'property',
        });

        return expect(response.text()).to.eventually.equal('Some body');
    });
});
