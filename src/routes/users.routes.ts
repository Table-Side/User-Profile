import { Router } from "express";
import passport from "passport";
import prisma from "../config/prisma";
import { User } from "@prisma/client";

const router = Router();

router.get("/me", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const userId = (req.user as User).id;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({"profile": {...user, password: undefined}});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;