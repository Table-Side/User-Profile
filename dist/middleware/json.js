"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonMiddleware = express_1.default.Router();
// Body parsing middleware (for POST requests with JSON data)
jsonMiddleware.use(express_1.default.json());
exports.default = jsonMiddleware;
//# sourceMappingURL=json.js.map