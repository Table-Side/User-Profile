"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorMiddleware = express_1.default.Router();
// Error handling middleware
errorMiddleware.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
    next();
});
exports.default = errorMiddleware;
//# sourceMappingURL=error.js.map