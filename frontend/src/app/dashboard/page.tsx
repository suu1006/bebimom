"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, clearAuth } = useAuth();

  async function handleLogout() {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout API failed:", e);
    } finally {
      clearAuth();
      router.push("/login");
    }
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="w-6 h-6 rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Dashboard
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
            내 계정
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {user?.name?.[0] ?? user?.email?.[0]?.toUpperCase()}
              </div>
              <div>
                {user?.name && (
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {user.name}
                  </p>
                )}
                <p className="text-sm text-zinc-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
