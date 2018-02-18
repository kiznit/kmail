import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';



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


export { passport };
