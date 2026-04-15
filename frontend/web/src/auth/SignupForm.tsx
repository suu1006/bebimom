"use client";

import { useState } from "react";
import { useRouter, Link } from "@/i18n/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { useTranslations } from "next-intl";

export function SignupForm() {
  const t = useTranslations("auth");
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
    if (
      password.length < 8 ||
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    ) {
      setError(t("passwordRuleError"));
      return;
    }

    setIsLoading(true);

    try {
      const res = await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        skipAuth: true,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? t("signupFailed"));
        return;
      }

      setAuth(data.user, data.accessToken);
      router.push("/dashboard");
    } catch {
      setError(t("networkError"));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        {t("signup")}
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        {t("hasAccount")}{" "}
        <Link
          href="/login"
          className="text-zinc-900 dark:text-zinc-50 font-medium underline underline-offset-4"
        >
          {t("login")}
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        <AuthInput
          id="name"
          label={t("name")}
          value={name}
          onChange={setName}
          placeholder={t("namePlaceholder")}
          autoComplete="name"
        />
        <AuthInput
          id="email"
          label={t("email")}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          required
        />
        <AuthInput
          id="password"
          label={t("password")}
          type="password"
          value={password}
          onChange={setPassword}
          placeholder={t("passwordPlaceholder")}
          autoComplete="new-password"
          required
        />

        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        )}

        <AuthButton
          isLoading={isLoading}
          label={t("signup")}
          loadingLabel={t("signingUp")}
        />
      </form>
    </div>
  );
}
