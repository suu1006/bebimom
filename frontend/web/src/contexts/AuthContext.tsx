"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { setAccessToken as syncToken } from "@/lib/api";

interface User {
  id: number;
  email: string;
  name: string | null;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // AT: 메모리에만 존재. 새로고침하면 null로 초기화됨
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // useEffect가 StrictMode에서 두 번 실행되는 것을 방지하는 플래그
  const initialized = useRef(false);

  useEffect(() => {
    //(StrictMode 이중 실행 방어)
    if (initialized.current) return;
    initialized.current = true;

    // [1단계] 브라우저에 RT 쿠키가 있으면 자동으로 서버에 전송됨
    // credentials: "include" 덕분에 httpOnly 쿠키가 헤더에 실려 감
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include", // httpOnly 쿠키 자동 전송
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.accessToken && data?.user) {
          // 3. 발급받은 새 AT 저장
          setAccessToken(data.accessToken);
          setUser(data.user);
          // 2. 새 AT를 메모리 저장
          syncToken(data.accessToken);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const setAuth = (user: User, token: string) => {
    setUser(user);
    setAccessToken(token);
    syncToken(token); // api.ts 모듈 변수와 동기화
  };

  const clearAuth = () => {
    setUser(null);
    setAccessToken(null);
    syncToken(null); // api.ts 모듈 변수 초기화
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, isLoading, setAuth, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth는 AuthProvider 안에서만 사용 가능합니다");
  return context;
}
