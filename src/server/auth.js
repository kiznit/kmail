import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import config from './config';


passport.use(
    new LocalStrategy(
        (username, password, done) => {
            if (username !== 'admin' || password !== '1234') {
                return done(null, null, { message: `The password is invalid for user ${username}.` });
            }

            const user = {
                username,
            };

            return done(null, user);
        },
    ),
);


passport.serializeUser((user, done) => {
    //console.log('*** serializeUser()');
    const userId = user;    // todo: fix
    done(null, userId);
});


passport.deserializeUser((userId, done) => {
    //console.log('*** deserializeUser():', userId);
    const user = userId;    // todo: fix
    done(null, user);
});


const hashPassword = async password => bcrypt.hash(password, Math.max(config.bcryptRounds || 0, 12));

const verifyPassword = async (plaintext, hash) => bcrypt.compare(plaintext, hash);


export { hashPassword, passport, verifyPassword };
