import express from 'express';

const errorMiddleware = express.Router();

// Error handling middleware
errorMiddleware.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
    next();
});

export default errorMiddleware;