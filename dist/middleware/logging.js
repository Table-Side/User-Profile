"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loggingMiddleware = express_1.default.Router();
// Logging middleware
loggingMiddleware.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});
exports.default = loggingMiddleware;
//# sourceMappingURL=logging.js.map