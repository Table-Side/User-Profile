import express from 'express';

const corsMiddleware = express.Router();

// CORS middleware (enable for cross-origin requests)
corsMiddleware.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

export default corsMiddleware;