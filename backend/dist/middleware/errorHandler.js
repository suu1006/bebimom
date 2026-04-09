"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    console.error(err.stack);
    res.status(500).json({ message: "서버 오류가 발생했습니다" });
}
