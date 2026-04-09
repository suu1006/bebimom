import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const PUBLIC_PATHS = ["/login", "/signup"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // URL에서 locale prefix(/ko, /en)를 제거한 순수 경로로 비교
  const pathnameWithoutLocale = pathname.replace(/^\/(ko|en)/, "") || "/";
  const isPublic = PUBLIC_PATHS.some((p) => pathnameWithoutLocale === p);
  const hasRefreshToken = request.cookies.has("refreshToken");

  // 현재 URL의 locale 추출 (없으면 기본값 ko)
  const locale = pathname.match(/^\/(ko|en)/)?.[1] ?? routing.defaultLocale;

  // 인증되지 않은 사용자가 보호된 페이지 접근 시 로그인으로 리다이렉트
  if (!isPublic && !hasRefreshToken) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // 인증된 사용자가 로그인/회원가입 페이지 접근 시 대시보드로 리다이렉트
  if (hasRefreshToken && isPublic) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // 인증 통과 후 next-intl 미들웨어로 locale 라우팅 처리
  return intlMiddleware(request);
}

export const config = {
  // API 라우트는 미들웨어에서 제외
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
