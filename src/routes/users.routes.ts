import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/me", async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await prisma.profile.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;