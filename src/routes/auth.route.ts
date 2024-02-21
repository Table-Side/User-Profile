import { Router } from "express";
import passport from "passport";
import type { User } from "../../node_modules/.prisma/client";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";
import { appConfig } from "../config/app";
import { encryptPassword } from "../utils/password";

const router = Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: false,
            message: "email/password are required",
        });
    }

    return Promise.resolve()
        .then(async () => {
            const hashedPassword = await encryptPassword(password);
            const emailUsed = await prisma.user.findUnique({ where: { email } });

            if (emailUsed) {
                throw new Error("User already exists with email");
            }

            const user = await prisma.user.create({
                data: { email, password: hashedPassword },
            });

            return user;
        })
        .then((user) => {
            return res.json(user);
        })
        .catch((err) => {
            return res.status(400).send({
                status: false,
                message: err.message,
            });
        });
});

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    return new Promise((resolve, reject) => {
        if (!email || !password) {
            reject(new Error("Email and Password are required."));
        }
        passport.authenticate("login", { session: false }, (err: any, user: Express.User, info: any) => {
            if (err) reject(err);
            if (info?.message) reject(new Error(info.message));
            resolve(user);
        })(req, res, next);
    })
        .then((user) => {
            const { id } = user as User;
            const token = jwt.sign(
                {
                    id,
                },
                appConfig.JWT_SECRET,
                {
                    expiresIn: "7d",
                }
            );
            return res.status(200).json({ status: true, token });
        })
        .catch((err) => {
            return res.status(400).json({
                status: false,
                message: err.message,
            });
        });
});

export default router;