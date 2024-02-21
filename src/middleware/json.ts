import express from 'express';

const jsonMiddleware = express.Router();

// Body parsing middleware (for POST requests with JSON data)
jsonMiddleware.use(express.json());

export default jsonMiddleware;