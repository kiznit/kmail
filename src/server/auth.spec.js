import request from 'supertest';
import app from './app';


const RE_COOKIE_CSRF = /^_csrf=[\w-]{24}; Path=\/$/;


// There is a bug in Jest where it doesn't merge multiple 'set-cookie' headers properly.
// Instead of having an array of cookies, we end up with an single-element list that
// has all the cookies in it (separated with comma). We use this helper to work around
// the issue.

// https://github.com/crux153/supertest/commit/a54069829ca94b3a80ce8e5e864c49b58dedd0d2
// https://github.com/facebook/jest/issues/2549

const getCookies = response => {
    const cookies = response.headers['set-cookie'];

    // No set-cookie header?
    if (cookies === undefined) {
        return [];
    }

    // If length is not 1, we know it's not broken
    if (cookies.length !== 1) {
        return cookies;
    }

    // If there are no commas in the first element, we only have one cookie
    if (!cookies[0].includes(',')) {
        return cookies;
    }

    // We have multiple cookies in one string, split them
    return cookies[0].split(',');
};


// Extract the CSRF token from the HTML response
const getCsrfToken = response => response.text.match(/window\._csrfToken = '([\w-]{36})';/)[1];


describe('auth - CSRF', () => {
    const agent = request.agent(app);
    let csrfToken;

    test('Loading a page generates a new CSRF token and cookie', () => {
        return agent
            .get('/')
            .expect(200)
            .expect('set-cookie', RE_COOKIE_CSRF)
            .expect(response => {
                const cookies = getCookies(response);
                expect(cookies).to.include.something.that.match(RE_COOKIE_CSRF);

                csrfToken = getCsrfToken(response);
                expect(csrfToken).to.be.a.string;
            });
    });

    test('Posting without a CSRF token should fail', () => {
        return agent
            .post('/login')
            .expect(403);
    });

    test('Posting with an invalid CSRF token should fail', () => {
        return agent
            .post('/login')
            .set('X-CSRF-Token', 'Ch663UvN-Y1_42Yy4WJ3V-v0EhEfNDV7YI4c')
            .expect(403);
    });

    test('Posting with a valid CSRF should work', () => {
        return agent
            .post('/login')
            .set('X-CSRF-Token', csrfToken)
            .expect(404);   // 404 because that route doesn't exist (yet)
    });
});
