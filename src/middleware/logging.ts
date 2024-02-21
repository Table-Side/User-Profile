import express from 'express';

const loggingMiddleware = express.Router();

// Logging middleware
loggingMiddleware.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

export default loggingMiddleware;