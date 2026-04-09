"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../lib/prisma");
const token_1 = require("../lib/token");
const validate_1 = require("../middleware/validate");
const auth_schema_1 = require("../schema/auth.schema");
const router = (0, express_1.Router)();
// POST /api/auth/register
router.post("/register", (0, validate_1.validate)(auth_schema_1.registerSchema), async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ message: "이미 사용 중인 이메일입니다" });
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: { email, password: hashed, name },
        });
        // JWT 토큰 발급
        const accessToken = (0, token_1.signAccessToken)({ id: user.id, email: user.email });
        const refreshToken = (0, token_1.signRefreshToken)({ id: user.id });
        await prisma_1.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일
            },
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, // 클라이언트에서만 쿠키 접근 가능
            sameSite: "lax", // 동일 사이트 내에서만 쿠키 전송
            secure: process.env.NODE_ENV === "production", // 배포 시, HTTPS 사용하도록 설정
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
        });
        return res.status(201).json({
            accessToken,
            user: { id: user.id, email: user.email, name: user.name },
        });
    }
    catch (err) {
        next(err);
    }
});
// POST /api/auth/login
router.post("/login", (0, validate_1.validate)(auth_schema_1.loginSchema), async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res
                .status(401)
                .json({ message: "이메일 또는 비밀번호가 올바르지 않습니다" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "이메일 또는 비밀번호가 올바르지 않습니다" });
        }
        const accessToken = (0, token_1.signAccessToken)({ id: user.id, email: user.email });
        const refreshToken = (0, token_1.signRefreshToken)({ id: user.id });
        await prisma_1.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({
            accessToken,
            user: { id: user.id, email: user.email, name: user.name },
        });
    }
    catch (err) {
        next(err);
    }
});
// POST /api/auth/refresh
router.post("/refresh", async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken;
        if (!token) {
            return res.status(401).json({ message: "Refresh Token이 없습니다" });
        }
        const stored = await prisma_1.prisma.refreshToken.findUnique({ where: { token } });
        if (!stored || stored.expiresAt < new Date()) {
            return res
                .status(401)
                .json({ message: "Refresh Token이 만료되었습니다" });
        }
        const payload = (0, token_1.verifyRefreshToken)(token);
        const user = await prisma_1.prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) {
            return res.status(401).json({ message: "유저를 찾을 수 없습니다" });
        }
        // Refresh Token Rotation — 기존 토큰 삭제 후 새로 발급
        const newRefreshToken = (0, token_1.signRefreshToken)({ id: user.id });
        await prisma_1.prisma.refreshToken.update({
            where: { id: stored.id },
            data: {
                token: newRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const accessToken = (0, token_1.signAccessToken)({ id: user.id, email: user.email });
        return res.json({
            accessToken,
            user: { id: user.id, email: user.email, name: user.name },
        });
    }
    catch (err) {
        next(err);
    }
});
// POST /api/auth/logout
router.post("/logout", async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken;
        // 1. 리프레시 토큰 삭제
        if (token) {
            await prisma_1.prisma.refreshToken.deleteMany({ where: { token } });
        }
        // 2. 쿠키삭제
        res.clearCookie("refreshToken");
        return res.json({ message: "로그아웃 되었습니다" });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
