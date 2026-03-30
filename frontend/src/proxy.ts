import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p);
  const hasRefreshToken = request.cookies.has("refreshToken");

  if (!isPublic && !hasRefreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (hasRefreshToken && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

// 정적 에셋 3가지(파비콘, 이미지, JS/CSS 정적 파일)를 제외한 모든 경로에서 미들웨어 실행.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
