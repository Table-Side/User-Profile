"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const protectedRoutes = (0, express_1.Router)();
// Me route
protectedRoutes.get('/me', authentication_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // User object is available in req.user due to authentication middleware
    // Return user data without password
    res.json(Object.assign(Object.assign({}, req.user), { password: undefined }));
}));
// Refresh token route
protectedRoutes.post('/refresh', authentication_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check token
}));
exports.default = protectedRoutes;
//# sourceMappingURL=protectedRoutes.js.map