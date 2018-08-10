import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import config from './config';
import { db } from './data';


const hashPassword = async password => bcrypt.hash(password, Math.max(config.bcryptRounds || 0, 12));

const verifyPassword = async (plaintext, hash) => bcrypt.compare(plaintext, hash);


passport.use(
    new LocalStrategy(
        (username, password, done) => {
            if (!username || !password) {
                return done(null, null, { message: 'Missing credentials' }, HttpStatus.BAD_REQUEST);
            }

            db('users')
                .where({ username })
                .first()
                .then(user => {
                    if (!user || !user.password) {
                        return [null, { message: `The password is invalid for user ${username}.` }];
                    }

                    return verifyPassword(password, user.password)
                        .then(verified => {
                            if (!verified) {
                                return [null, { message: `The password is invalid for user ${username}.` }];
                            }

                            return user;
                        });
                })
                .asCallback(done, { spread: true });
        },
    ),
);


passport.serializeUser((user, done) => {
    // The return value will be stored at 'req.session.passport.user'
    return done(null, user.id);
});


passport.deserializeUser((userId, done) => {
    // The returned value will be stored at 'req.user'
    db('users')
        .where({ id: userId })
        .first()
        .then(user => user || false)  // The 'false' is important here: it will logout the user. Returning 'undefined' doesn't work.
        .asCallback(done);
});


export { hashPassword, passport, verifyPassword };
