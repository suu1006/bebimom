import { defineRouting } from "next-intl/routing";

/**
 * 사용 가능한 언어 목록 정의
 */
export const routing = defineRouting({
  locales: ["ko", "en"], // 지원하는 언어 목록
  defaultLocale: "ko", // 기본 언어
});
