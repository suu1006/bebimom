"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNAUTHENTICATED_ROUTE = void 0;
/** 클라이언트가 401 시 이동할 화면 경로 (Expo Router 등). 필요 시 .env로 덮어씀 */
exports.UNAUTHENTICATED_ROUTE = process.env.CLIENT_UNAUTHENTICATED_ROUTE?.trim() || "/(auth)/login";
