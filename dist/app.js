"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("./middleware/cors"));
const authentication_1 = __importDefault(require("./middleware/authentication"));
const error_1 = __importDefault(require("./middleware/error"));
const json_1 = __importDefault(require("./middleware/json"));
const logging_1 = __importDefault(require("./middleware/logging"));
const publicRoutes_1 = __importDefault(require("./routes/publicRoutes"));
const protectedRoutes_1 = __importDefault(require("./routes/protectedRoutes"));
class App {
    constructor() {
        this.server = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.server.use(json_1.default);
        this.server.use(error_1.default);
        this.server.use(logging_1.default);
        this.server.use(cors_1.default);
        this.server.use(authentication_1.default);
    }
    routes() {
        this.server.use(publicRoutes_1.default);
        this.server.use(protectedRoutes_1.default);
    }
}
exports.default = new App().server;
//# sourceMappingURL=app.js.map