"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";

export function SignupForm() {
  const router = useRouter();
  const { setAuth } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        skipAuth: true,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "회원가입에 실패했습니다");
        return;
      }

      setAuth(data.user, data.accessToken);
      router.push("/dashboard");
    } catch {
      setError("네트워크 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        회원가입
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="text-zinc-900 dark:text-zinc-50 font-medium underline underline-offset-4"
        >
          로그인
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        <AuthInput
          id="name"
          label="이름"
          value={name}
          onChange={setName}
          placeholder="홍길동"
          autoComplete="name"
        />
        <AuthInput
          id="email"
          label="이메일"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="example@email.com"
          autoComplete="email"
          required
        />
        <AuthInput
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="8자 이상 입력하세요"
          autoComplete="new-password"
          required
        />

        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        )}

        <AuthButton
          isLoading={isLoading}
          label="회원가입"
          loadingLabel="가입 중..."
        />
      </form>
    </div>
  );
}
