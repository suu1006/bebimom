"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../../.env") });
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const prisma_1 = require("../generated/prisma");
// 개발 시, globalThis에 저장해 재사용(new PrismaClient() 반복되면 DB 연결 쌓임)
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma ?? new prisma_1.PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
