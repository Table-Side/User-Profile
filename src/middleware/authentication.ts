import prisma from '@prisma/client';

import passport from 'passport';
import passportJWT from 'passport-jwt';

const jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};
const strategy = new passportJWT.Strategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await prisma.User.findUnique({ where: { id: jwtPayload.id } });
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, false);
    }
});

passport.use(strategy);

// Middleware for token authentication
const authenticate = passport.authenticate('jwt', { session: false });
export default { authenticate, strategy, jwtOptions };