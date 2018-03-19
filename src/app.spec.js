import request from 'supertest';
import app from './app';


// Some regexs to validate cookies
const COOKIE_CSRF = /^kmail.session=[\w\-]{24}; Path=\/; HttpOnly; SameSite=Strict$/;
const COOKIE_SESSION = /^kmail.auth=s%3A[\w\-]{32}\.[\w%]{43,}; Path=\/; HttpOnly; SameSite=Strict$/;

// There is a bug in Jest where it doesn't merge multiple 'set-cookie' headers properly.
// Instead of having an array of cookies, we end up with an single-element list that
// has all the cookies in it (separated with comma). We use this helper to work around
// the issue.

// https://github.com/crux153/supertest/commit/a54069829ca94b3a80ce8e5e864c49b58dedd0d2
// https://github.com/facebook/jest/issues/2549

const getCookies = res => {
    const cookies = res.headers['set-cookie'];

    // No set-cookie header?
    if (cookies === undefined) {
        return [];
    }

    // If length is not 1, we know its not broken
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


describe('app', () => {

    test('serves static files', () => {
        return request(app)
            .get('/apple-touch-icon.png')
            .expect(200);
    });


    test('responds to /', () => {
        return request(app)
            .get('/')
            .expect(200)
            .expect(res => {
                // Verify that we got the login screen
                expect(res.text).to.contain('Please enter your username and password');

                // Verify cookies:
                //  - We expect a CSRF cookie to allow "safe" login
                //  - We do not expect a session cookie (the user is not logged in yet)
                const cookies = getCookies(res);
                expect(cookies).to.be.an('array').and.have.length(1);
                expect(cookies).to.include.something.that.match(COOKIE_CSRF);
            });
    });
});


//todo: each page load has a different token, even for the same user (COOKIE_CSRF)
//todo: csrf test with two agents exchanging their token