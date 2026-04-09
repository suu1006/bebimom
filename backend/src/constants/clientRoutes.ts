/** 클라이언트가 401 시 이동할 화면 경로 (Expo Router 등). 필요 시 .env로 덮어씀 */
export const UNAUTHENTICATED_ROUTE =
  process.env.CLIENT_UNAUTHENTICATED_ROUTE?.trim() || "/(auth)/login";
