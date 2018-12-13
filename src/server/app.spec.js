import request from 'supertest';
import app from './app';


describe('app', () => {
    test('responds to /', () => {
        return request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });

    test('responds to /ping', () => {
        return request(app)
            .get('/ping')
            .expect(200)
            .expect(response => {
                expect(response.body).to.be.empty;
            });
    });

    test('serves static image file', () => {
        return request(app)
            .get('/apple-touch-icon.png')
            .expect(200)
            .expect('Content-Type', 'image/png');
    });

    test('serves static text file', () => {
        return request(app)
            .get('/robots.txt')
            .expect(200)
            .expect('Content-Type', 'text/plain; charset=UTF-8');
    });

    test('unknown path serves a 404', () => {
        return request(app)
            .get('/non-existing-page')
            .expect(404)
            .expect('Content-Type', 'text/html; charset=utf-8');
    });
});
