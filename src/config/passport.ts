import type { Express } from "express";
import passport from "passport";
import passportJWT from "passport-jwt";
import prisma from "./prisma";
import { appConfig } from "./app";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export const configure = (app: Express) => {
    app.use(passport.initialize());

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: appConfig.JWT_SECRET,
            },
            (jwtPayload, cb) => {
                return prisma.user
                    .findUnique({ where: { id: jwtPayload.id } })
                    .then((user) => {
                        if (!user) throw new Error("Not found the user");
                        return cb(null, user);
                    })
                    .catch((err) => {
                        return cb(err);
                    });
            }
        )
    );
};