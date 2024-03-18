import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { appConfig } from "../config/app";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, appConfig.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            // Store the decoded user information in the request object
            req.user = decoded;
            next();
        });
    } else {
        res.sendStatus(404);
    }
};

export default authenticateJWT;