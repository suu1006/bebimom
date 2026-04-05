const MAX_RETRY_ATTEMPTS = 1; // 요청당 1회만 재시도

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
  _retryCount?: number; // 내부 플래그
}

// Access Token을 모듈 레벨에서 관리 (AuthContext와 동기화)
let currentAccessToken: string | null = null;
let lastRefreshAttempt = 0;
const MIN_REFRESH_INTERVAL = 1000; // 1초

export function setAccessToken(token: string | null) {
  currentAccessToken = token;
}

async function refreshAccessToken(): Promise<string | null> {
  const now = Date.now();
  if (now - lastRefreshAttempt < MIN_REFRESH_INTERVAL) {
    console.warn("Token refresh rate limited");
    return null;
  }
  lastRefreshAttempt = now;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include", // httpOnly 쿠키 자동 전송
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    currentAccessToken = data.accessToken;
    return data.accessToken;
  } catch {
    return null;
  }
}

export async function api(
  path: string,
  options: FetchOptions = {},
): Promise<Response> {
  const { skipAuth = false, _retryCount = 0, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth && currentAccessToken) {
    headers["Authorization"] = `Bearer ${currentAccessToken}`;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...fetchOptions,
    headers,
    credentials: "include",
  });

  // Access Token 만료 시 자동 갱신 후 재시도 (재시도 제한 추가)
  if (res.status === 401 && !skipAuth && _retryCount < MAX_RETRY_ATTEMPTS) {
    const newToken = await refreshAccessToken();
    if (!newToken) return res; // Refresh Token도 만료 → 로그인 페이지로 이동 필요

    // 재시도 카운트 증가하여 재귀 호출
    return api(path, { ...options, _retryCount: _retryCount + 1 });
  }

  return res;
}
