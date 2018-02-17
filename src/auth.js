import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';



passport.use(
    new LocalStrategy(
        (username, password, done) => {
            if (username !== 'admin') {
                return done(null, null, { message: 'Invalid password' });
            }

            if (password !== '1234') {
                return done(null, null, { message: 'Invalid password' });
            }

            const user = {
                username,
            };

            return done(null, user);
        },
    ),
);


export { passport };
