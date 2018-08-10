import request from 'supertest';
import app from './app';

import { passport } from './auth';


// Some regexs to validate cookies
const RE_COOKIE_CSRF = /^kmail.session=[\w-]{24}; Path=\/; HttpOnly; SameSite=Strict$/;
const RE_COOKIE_SESSION = /^kmail.auth=s%3A[\w-]{32}\.[\w%]{43,}; Path=\/; HttpOnly; SameSite=Strict$/;
const RE_COOKIE_SESSION_DELETE = /kmail.auth=; Path=\/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict/;


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


describe('auth - login', () => {
    const agent = request.agent(app);
    let csrfToken;

    test('user loads page', () => {
        return agent.get('/')
            .expect(200)
            .expect('set-cookie', RE_COOKIE_CSRF)
            .expect(response => {
                // Verify that we got the login screen
                expect(response.text).to.contain('Please enter your username and password');

                // Verify cookies:
                //  - We expect a CSRF cookie to allow 'safe' login
                //  - We do not expect a session cookie (the user is not logged in yet)
                const cookies = getCookies(response);
                expect(cookies).to.be.an('array').and.have.length(1);
                expect(cookies).to.include.something.that.match(RE_COOKIE_CSRF);

                // Scrub the CSRF token from the HTML for the following tests
                csrfToken = getCsrfToken(response);
            });
    });

    test("invalid user can't log in", () => {
        return agent
            .post('/api/login')
            .send({ username: 'admin2', password: '1234' })
            .set('X-CSRF-Token', csrfToken)
            .expect(401);
    });

    test("invalid password can't log in", () => {
        return agent
            .post('/api/login')
            .send({ username: 'admin', password: '4321' })
            .set('X-CSRF-Token', csrfToken)
            .expect(401);
    });

    test('user can log in', () => {
        return agent
            .post('/api/login')
            .send({ username: 'admin', password: '1234' })
            .set('X-CSRF-Token', csrfToken)
            .expect('set-cookie', RE_COOKIE_SESSION)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, {
                username: 'admin',
            });
    });

    test('user can log out', () => {
        return agent
            .post('/api/logout')
            .set('X-CSRF-Token', csrfToken)
            .expect(200)
            .expect('set-cookie', RE_COOKIE_SESSION_DELETE);
    });
});


describe('auth - CSRF', () => {
    const agent1 = request.agent(app);
    const agent2 = request.agent(app);

    let csrfToken1;
    let csrfToken2;

    test("users can't login without a token", async () => {
        await agent1
            .post('/api/login')
            .send({ username: 'admin', password: '1234' })
            .expect(403);
    });

    test('users have different CSRF tokens', async () => {
        const response1 = await agent1.get('/');
        const response2 = await agent2.get('/');

        csrfToken1 = getCsrfToken(response1);
        csrfToken2 = getCsrfToken(response2);

        expect(csrfToken2).to.not.equal(csrfToken1);
    });

    test("users can't swap tokens", async () => {
        await agent1
            .post('/api/login')
            .send({ username: 'admin', password: '1234' })
            .set('X-CSRF-Token', csrfToken2)
            .expect(403);

        await agent2
            .post('/api/login')
            .send({ username: 'admin', password: '1234' })
            .set('X-CSRF-Token', csrfToken1)
            .expect(403);
    });

    test('users can login with their tokens', async () => {
        await agent1
            .post('/api/login')
            .send({ username: 'admin', password: '1234' })
            .set('X-CSRF-Token', csrfToken1)
            .expect(200);

        await agent2
            .post('/api/login')
            .send({ username: 'admin', password: '1234' })
            .set('X-CSRF-Token', csrfToken2)
            .expect(200);
    });
});


describe('auth - deserializeUser', () => {
    test('deserializeUser can find user', done => {
        passport.deserializeUser(1, (err, result) => {
            if (err) {
                done(err);
            }

            expect(err).to.be.null;
            expect(result).to.have.property('id', 1);
            expect(result).to.have.property('username', 'admin');
            done();
        });
    });

    test("deserializeUser can't find user", done => {
        passport.deserializeUser(999, (err, result) => {
            if (err) {
                done(err);
            }

            expect(err).to.be.null;
            expect(result).to.be.false;
            done();
        });
    });
});
