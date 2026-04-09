"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
/** 인증 필요 예시: GET /api/me */
router.get("/me", authenticate_1.authenticate, (req, res) => {
    res.json({ user: req.user });
});
exports.default = router;
