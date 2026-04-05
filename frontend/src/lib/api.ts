interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

// Access Token을 모듈 레벨에서 관리 (AuthContext와 동기화)
let currentAccessToken: string | null = null;

export function setAccessToken(token: string | null) {
  currentAccessToken = token;
}

async function refreshAccessToken(): Promise<string | null> {
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
  const { skipAuth = false, ...fetchOptions } = options;

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

  // Access Token 만료 시 자동 갱신 후 재시도
  if (res.status === 401 && !skipAuth) {
    const newToken = await refreshAccessToken();
    if (!newToken) return res; // Refresh Token도 만료 → 로그인 페이지로 이동 필요

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      ...fetchOptions,
      headers: { ...headers, Authorization: `Bearer ${newToken}` },
      credentials: "include", // 쿠키 자동 전송
    });
  }

  return res;
}
