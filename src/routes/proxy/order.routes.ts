import { Router } from "express";
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
import authenticateJWT from "../../middleware/authenticate";

const routeConfig = [
];

const router = Router();

// router.post("/new", authenticateJWT, async (req, res) => {

// });

// router.put("/:orderId/add", authenticateJWT, async (req, res) => {

// });

// router.patch("/:orderId/updateQuantity", authenticateJWT, async (req, res) => {

// });

// router.delete("/:orderId/remove", authenticateJWT, async (req, res) => {
    
// });

// router.delete("/:orderId/abandon", authenticateJWT, async (req, res) => {
    
// });

// router.get("/:orderId", authenticateJWT, async (req, res) => {
    
// });

// router.get("/active", authenticateJWT, async (req, res) => {
    
// });

// router.get("/history", authenticateJWT, async (req, res) => {
    
// });

export default router;