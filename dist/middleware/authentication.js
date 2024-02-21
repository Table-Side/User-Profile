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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("@prisma/client"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};
const strategy = new passport_jwt_1.default.Strategy(jwtOptions, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield client_1.default.User.findUnique({ where: { id: jwtPayload.id } });
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    }
    catch (error) {
        done(error, false);
    }
}));
passport_1.default.use(strategy);
// Middleware for token authentication
const authenticate = passport_1.default.authenticate('jwt', { session: false });
exports.default = { authenticate, strategy, jwtOptions };
//# sourceMappingURL=authentication.js.map