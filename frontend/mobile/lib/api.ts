import { User } from "@shared/type/user";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL?.trim() || "http://localhost:4000";

export interface AuthResponse {
  accessToken: string;
  user: User;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `오류가 발생했습니다 (${res.status})`);
  }
  return data as T;
}

// --- Auth API ---

export async function loginApi(credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse<AuthResponse>(res);
}

export async function registerApi(body: {
  email: string;
  password: string;
  name: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<AuthResponse>(res);
}

export async function logoutApi(accessToken: string): Promise<void> {
  await fetch(`${BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

// --- Authenticated fetch helper ---

export function createAuthFetch(accessToken: string) {
  return async function authFetch(
    path: string,
    init: RequestInit = {},
  ): Promise<Response> {
    return fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...(init.headers as Record<string, string>),
      },
    });
  };
}
