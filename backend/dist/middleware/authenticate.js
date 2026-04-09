"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const clientRoutes_1 = require("../constants/clientRoutes");
function authenticate(req, res, next) {
    // 1. 토큰 체크(AutAuthorization 헤더) - 토큰이 없으면, 401 
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "인증 토큰이 없습니다",
            route: clientRoutes_1.UNAUTHENTICATED_ROUTE,
        });
    }
    // 2. 토큰 검증(jwt.verify) - 토큰이 만료되었거나 유효하지 않으면, 401
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = payload;
        next();
    }
    catch {
        res.status(401).json({
            message: "토큰이 만료되었거나 유효하지 않습니다",
            route: clientRoutes_1.UNAUTHENTICATED_ROUTE,
        });
    }
}
