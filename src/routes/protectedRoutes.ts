import { Router } from 'express';

import { authenticate, strategy, jwtOptions } from '../middleware/authentication';

const protectedRoutes = Router();

// Me route
protectedRoutes.get('/me', authenticate, async (req, res) => {
    // User object is available in req.user due to authentication middleware

    // Return user data without password
    res.json({ ...req.user, password: undefined });
});

// Refresh token route
protectedRoutes.post('/refresh', authenticate, async (req, res) => {
   // Check token
});

export default protectedRoutes;