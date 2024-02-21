"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicRoutes = (0, express_1.Router)();
// Register route
publicRoutes.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password, role } = req.body;
    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    // Provide default role
    if (!role) {
        role = 'Normal';
    }
    // Check if email already exists
    const existingUser = yield prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
    }
    // Hash password
    const hashedPassword = yield bcrypt.hash(password, 10);
    // Create user in database
    try {
        const user = yield prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                role: role,
            },
        });
        res.status(201).json({ message: 'User created successfully!', user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Login route
publicRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    // Find user by email
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Compare hashed passwords
    const validPassword = yield bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Generate JWT token
    const token = passportJWT.sign({ id: user.id }, jwtOptions.secretOrKey);
    // Send user data and token
    res.json(Object.assign(Object.assign({}, user), { password: undefined, token }));
}));
exports.default = publicRoutes;
//# sourceMappingURL=publicRoutes.js.map